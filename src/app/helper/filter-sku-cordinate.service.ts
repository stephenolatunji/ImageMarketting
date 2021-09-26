import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterSkuCordinateService {

  constructor() { }

  public async start(data, sku, taskId) { 
    
    let expectedResult;
    data = data.filter(dat=>dat.taskId == taskId); 
    // console.log(data)
    switch (sku) {
      case 'budweiser':
        expectedResult = this.modifyToArray(data[0]?.budweiser);   
        break;
      case 'bud_can':
        expectedResult = this.modifyToArray(data[0]?.bud_can);
        break;
      case 'trophy':
        expectedResult = this.modifyToArray(data[0]?.trophy);
        break;
      case 'trophy_can':
        expectedResult = this.modifyToArray(data[0]?.trophy_can);
        break;
      case 'trophy_stout':
        expectedResult = this.modifyToArray(data[0]?.trophy_stout);
        break;
      case 'beta_malt':
        expectedResult = this.modifyToArray(data[0]?.betamalt);
        break;
      case 'beta_can':
        expectedResult = this.modifyToArray(data[0]?.beta_can);
        break;
      case 'castle_lite':
        expectedResult = this.modifyToArray(data[0]?.castle_lite);
        break;
      case 'hero':
        expectedResult = this.modifyToArray(data[0]?.hero);
        break;
      case 'hero_can':
        expectedResult = this.modifyToArray(data[0]?.hero_can);
        break;
      case 'eagle':
        expectedResult = this.modifyToArray(data[0]?.eagle);
        break;
      case 'eagle_stout':
        expectedResult = this.modifyToArray(data[0]?.eagle_stout);
        break;
      case 'grand_malt':
        expectedResult = this.modifyToArray(data[0]?.grandmalt);
        break;
      case 'grand_can':
        expectedResult = this.modifyToArray(data[0]?.grand_can);
        break;
    }
    return expectedResult;
    }

  modifyToArray(data) {
    // the type of value needed is [ [122,222], [222,222] ]
    // so we covert fr sstring to such
    if(data === '') {
      return false
    }
    else {
      data = data.split("-");
      let modifiedData = [];
      data.map(dat=> {
        const splittedSkuCordinate = dat.split(",");
        const splittedSkuCordinateIndexZero = parseFloat(splittedSkuCordinate[0]);
        const splittedSkuCordinateIndexOne = parseFloat(splittedSkuCordinate[1]);
        modifiedData.push([splittedSkuCordinateIndexZero, splittedSkuCordinateIndexOne]);
      });
      return [modifiedData];
    }
  }
}
