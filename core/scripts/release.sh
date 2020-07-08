name=$(node -p -e "require('./package.json').name")
user=$(node -p -e "require('./server/package.json').server.user")
host=$(node -p -e "require('./server/package.json').server.host")
server_address=$user@$host

server=false
client=false
admin=false

for i in "$@"; do
case $i in
  --server)
  server=true
  shift
  ;;
  --client)
  client=true
  shift
  ;;
  --admin)
  admin=true
  shift
  ;;
  -s|--start)
  start=true
  shift
  ;;
  -b|--build)
  build=true
  shift
  ;;
  *)
  ;;
esac
done

if [ "$server" == false ] && [ "$client" == false ] && [ "$admin" == false ]; then
  server=true
  client=true
  admin=true
fi

# client build and release
if [ "$client" == true ]; then
  if [ "$build" = "true" ]; then
    cd client
    npm i
    ng build --prod --aot
    cd ..
  fi

  ssh $server_address "mkdir -p $name && cd $name && rm -rf client/dist && rm -rf client/package.json"
  rsync -avr client/dist $server_address:$name/client
  rsync -avr client/package.json $server_address:$name/client
  ssh $server_address ". .nvm/nvm.sh && cd ~/$name/client && sed -i '/git+ssh/d' package.json && npm i"
fi

# admin build and release
if [ "$admin" == true ]; then
  if [ "$build" = "true" ]; then
    cd admin
    npm i
    ng build --prod --aot
    cd ..
  fi

  ssh $server_address "mkdir -p $name && cd $name && rm -rf admin/dist && rm -rf admin/package.json"
  rsync -avr admin/dist $server_address:$name/admin
  rsync -avr admin/package.json $server_address:$name/admin
  ssh $server_address ". .nvm/nvm.sh && cd ~/$name/admin && sed -i '/git+ssh/d' package.json && npm i"
fi

# server build and release
if [ "$server" == true ]; then
  start_script="export NODE_ENV=production && forever start ~/$name/server/dist/server.js"
  if [ -z "$start" ]; then
    start_script="forever restartall"
  fi

  if [ "$build" = "true" ]; then
    cd server
    npm i
    npm run build
    cd ..
  fi

  ssh $server_address "mkdir -p $name && cd $name && rm -rf server/dist && rm -rf server/package.json"
  rsync -avr server/dist $server_address:$name/server
  rsync -avr server/package.json $server_address:$name/server
  ssh $server_address ". .nvm/nvm.sh && cd ~/$name/server && npm i && ${start_script}"
fi
