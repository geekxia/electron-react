/**
  功能：从数组dva._models中指出指定的model
*/
export function getDvaModel(namespace, dvaModels){
  let curState = {};
  for(let i=0; i<dvaModels.length; i++) {
    if (dvaModels[i].namespace == namespace) {
      curState = dvaModels[i].state;
      break;
    }
  }
  return curState;
}
