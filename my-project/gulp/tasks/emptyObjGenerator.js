export function generateEmptyObjModal(fields = false) {
    let emptyObj = {
      meta: {},
    };
    if(!fields) {
        return emptyObj;
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema':  emptyObj[key] = {} ;
              break;
            case 'String':  emptyObj[key] = '';
              break;
            case 'Number':  emptyObj[key] = '';
              break;
            case 'imageSchema':  emptyObj[key] =  {};
              break;
            case '[imageSchema]':  emptyObj[key] = [];
              break;
            case 'Date':  emptyObj[key] = 'new Date()';
              break;
        }
    });
    return  JSON.stringify(emptyObj);
  }
  