import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public trimmedData; public trimmedData_;

  constructor() { }

  async filterFunc(data, filter_by, value) {
    this.trimmedData = [];
    
    data.forEach(element => {

        switch (filter_by) {
          case 'BDR':
            if (element.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                return this.trimmedData.push(element);          
            }
            break;
  
          case 'POC_ID':
            if (element.pocId.toLowerCase().indexOf(value.toLowerCase()) > -1) {
               return this.trimmedData.push(element)
            }
            break;

          case 'TEAM_LEADER':
            if (element.team_lead.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                return this.trimmedData.push(element)
            }
            break;
  
          case 'DISTRICT':
            if (element.district.toLowerCase().indexOf(value.toLowerCase()) > -1) {
              return this.trimmedData.push(element)
            }
            break;
  
          case 'CHILLER_PRESENCE':
            (element.chillerPresent == '')? element.chillerPresent = 'No' : null;
            if (element.chillerPresent.toLowerCase().indexOf(value.toLowerCase()) > -1) {
              return this.trimmedData.push(element);
            }
            break;
  
  
          case 'DATE':
            if (element.date.toLowerCase().indexOf(value.toLowerCase()) > -1) {
              return this.trimmedData.push(element)
            }
            break;
        
          default:
            break;
        }
       
      });
      
    //  setTimeout(() => {      
        return this.trimmedData
      // }, 1000);
  }

  async filterCheckBox(checkBox, trimmedData) {

    this.trimmedData_ = [];
    trimmedData.forEach(element => {
      // good exec
      if(checkBox.glass && checkBox.chest && checkBox.good && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        ((element.glass == 1 || element.chest == 1 || element.glass !== 1 || element.chest !== 1) && (element.action.toLowerCase() == 'success' || element.action.toLowerCase() == 'bad' || element.action == 'Awaiting AI') && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.chest && checkBox.glass && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && (element.chest == 1 || element.glass == 1 ) && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad && checkBox.chest && checkBox.glass && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('bad') > -1 && (element.chest == 1 || element.glass == 1) && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ) )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.chest && checkBox.good && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.chest == 1 && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1)  && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.good && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.glass == 1 && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1) && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.good && checkBox.bad && checkBox.chest && checkBox.no_working_chiller) {
        ((element.glass == 1 || element.chest == 1) && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1) && element.coolerStatus.toLowerCase().indexOf('not_working') > -1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.good && checkBox.bad && checkBox.chest && checkBox.working_chiller) {
        ((element.glass == 1 || element.chest == 1) && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1) && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }
      
      else if(checkBox.good && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null
      }

      else if(checkBox.chest && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.chest == 1 && element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null
      }
      
      else if(checkBox.glass && checkBox.good && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.glass == 1 && element.action.toLowerCase().indexOf('success') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.glass == 1 && element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.chest && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && element.chest == 1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.chest && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.glass == 1 || element.chest == 1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }
      
      else if(checkBox.chest && checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.chest == 1 && element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.chest && checkBox.glass && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && (element.chest == 1 || element.glass == 1 ) && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad && checkBox.chest && checkBox.glass && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('bad') > -1 && (element.chest == 1 || element.glass == 1) && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ) )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.chest && checkBox.good && checkBox.bad && checkBox.no_working_chiller) {
        (element.chest == 1 && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1)  && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.good && checkBox.bad && checkBox.no_working_chiller) {
        (element.glass == 1 && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1) && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.chest && checkBox.glass && checkBox.working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && (element.chest == 1 || element.glass == 1 ) && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad && checkBox.chest && checkBox.glass && checkBox.working_chiller) {
        (element.action.toLowerCase().indexOf('bad') > -1 && (element.chest == 1 || element.glass == 1) && element.coolerStatus.toLowerCase().indexOf('not_working') > -1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.chest && checkBox.good && checkBox.bad && checkBox.working_chiller) {
        (element.chest == 1 && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1)  && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.good && checkBox.bad && checkBox.working_chiller) {
        (element.glass == 1 && (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1) && element.coolerStatus == 'working')? this.trimmedData_.push(element) : null;
      }
      
      else if(checkBox.good && checkBox.bad && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null
      }
      else if(checkBox.good && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.chest && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.chest == 1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.working_chiller && checkBox.no_working_chiller) {
        (element.glass == 1 && (element.coolerStatus == 'working' || element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.bad && checkBox.glass) {
        (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1 && element.glass == 1)? this.trimmedData_.push(element) : null
      }

      else if(checkBox.good && checkBox.bad && checkBox.chest) {
        (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1 && element.chest == 1)? this.trimmedData_.push(element) : null
      }
      
      else if(checkBox.glass && checkBox.good && checkBox.no_working_chiller) {
        (element.glass == 1 && element.action.toLowerCase().indexOf('success') > -1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.bad && checkBox.no_working_chiller) {
        (element.glass == 1 && element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.chest && checkBox.no_working_chiller) {
        (element.glass == 1 || element.chest == 1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }
      
      else if(checkBox.chest && checkBox.bad && checkBox.no_working_chiller) {
        (element.chest == 1 && element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.bad && checkBox.working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 || element.action.toLowerCase().indexOf('bad') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null
      }
      
      else if(checkBox.glass && checkBox.good && checkBox.working_chiller) {
        (element.glass == 1 && element.action.toLowerCase().indexOf('success') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.bad && checkBox.working_chiller) {
        (element.glass == 1 && element.action.toLowerCase().indexOf('bad') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.chest && checkBox.working_chiller) {
        (element.glass == 1 || element.chest == 1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }
      
      else if(checkBox.chest && checkBox.bad && checkBox.working_chiller) {
        (element.chest == 1 && element.action.toLowerCase().indexOf('bad') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.chest && checkBox.good && checkBox.working_chiller) {
        (element.chest == 1 && element.action.toLowerCase().indexOf('success') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.chest && checkBox.bad && checkBox.glass) {
        ((element.chest == 1 || element.glass == 1) && element.action.toLowerCase().indexOf('bad') > -1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad && checkBox.no_working_chiller) {
        (element.action.toLowerCase().indexOf('bad') > -1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.chest && checkBox.no_working_chiller) {
        (element.chest == 1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.no_working_chiller) {
        (element.glass == 1 && (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 ))? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good && checkBox.working_chiller) {
        (element.action.toLowerCase().indexOf('success') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad && checkBox.working_chiller) {
        (element.action.toLowerCase().indexOf('bad') > -1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.bad && checkBox.chest) {
        (element.action.toLowerCase().indexOf('bad') > -1 &&element.chest == 1 )? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.bad && checkBox.glass) {
        (element.action.toLowerCase().indexOf('bad') > -1 && element.glass == 1 )? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.good && checkBox.glass) {
        (element.action.toLowerCase().indexOf('success') > -1 && element.glass == 1 )? this.trimmedData_.push(element) : null;        
      }
      else if(checkBox.good && checkBox.chest) {
        (element.action.toLowerCase().indexOf('success') > -1 && element.chest == 1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.chest && checkBox.working_chiller) {
        (element.chest == 1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass && checkBox.working_chiller) {
        (element.glass == 1 && element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.working_chiller) {
        (element.coolerStatus == 'working' )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.no_working_chiller) {
        (element.coolerStatus.toLowerCase().indexOf('not_working') > -1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.good) {
        (element.action.toLowerCase().indexOf('success') > -1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.bad) {
        (element.action.toLowerCase().indexOf('bad') > -1 )? this.trimmedData_.push(element) : null;
      }

      else if(checkBox.glass) {
        (element.glass == 1)? this.trimmedData_.push(element) : null;
      }
      else if(checkBox.chest) {
        (element.chest == 1)? this.trimmedData_.push(element) : null;
      }

     

      // if(checkBox.working_chiller) {
      //   (element.coolerStatus == 'working')? this.trimmedData_.push(element) : null
      // }

      // if(checkBox.no_working_chiller) {
      //   (element.coolerStatus.toLowerCase().indexOf('not_working') > -1)? this.trimmedData_.push(element) : null
      // }
      
    });
  
    return this.trimmedData_;
  }
      
}

