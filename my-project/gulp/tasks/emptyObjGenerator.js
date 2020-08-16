export function generateEmptyObjModal(fields = false) {
    let emptyObj = {
      meta: {},
    };
    if(!fields) {
        return emptyObj;
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingual':  emptyObj[key] = {} ;
              break;
            case 'string':  emptyObj[key] = '';
              break;
            case 'number':  emptyObj[key] = '';
              break;
            case 'image':  emptyObj[key] =  {};
              break;
            case 'images':  emptyObj[key]  = [];
              break;
        }
    });
    return  JSON.stringify(emptyObj);
  }
  