# Linux implementation
# gnome-terminal --tab -e "bash -c 'cd server && npm run build && npm run watch'"
# gnome-terminal --tab -e "bash -c 'cd client && ng serve --open'"
# gnome-terminal --tab -e "bash -c 'cd admin && ng serve --open'"

# Mac OS implementation
osascript <<END 
tell app "Terminal" to do script "cd \"`pwd`/server\" && npm run build && npm run watch" 
END

osascript <<END 
tell app "Terminal" to do script "cd \"`pwd`/client\" && ng serve --open" 
END

osascript <<END 
tell app "Terminal" to do script "cd \"`pwd`/admin\" && ng serve --open" 
END