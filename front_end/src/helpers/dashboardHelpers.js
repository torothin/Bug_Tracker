export function configData(type, inputData) {
    const dataMap = {};
    const labels = [];
    const dataArray = [];
    const inputType = type === 'user' ? 'type' : type;

    // takes the JSON data and creates a map of the ticket type (key) 
    // to the number of tickets (value)
    // doing it this way such that string and int data types will work for 
    // creating the new datasets
    inputData.map(item => {
        if(!dataMap[item[inputType]]) {
            dataMap[item[inputType]] = 1;
        }
        else dataMap[item[inputType]]++;
        return item;
    })

    // turns the map into two arrays for labels and number of tickets
    for (let property in dataMap) {
        if (!dataMap.hasOwnProperty(property)) {
            continue;
        }
        labels.push(property);
        dataArray.push(dataMap[property]);
    }
    
    // blank dataset
    const newDataSet = {
        labels: [],
        datasets: [{label:type,data:[],
                backgroundColor: [
                    _randomColor(0.2),
                    _randomColor(0.2),
                    _randomColor(0.2),
                    _randomColor(0.2),
                    _randomColor(0.2),
                    _randomColor(0.2)
                ],
                
                borderWidth: 1}],
    };

    newDataSet.labels = labels;
    newDataSet.datasets[0].data = dataArray;
    
    return newDataSet;
}

function _randomColor(opacity) {
    return `rgba(${Math.floor(Math.random()*255)}, 
                 ${Math.floor(Math.random()*255)}, 
                 ${Math.floor(Math.random()*255)}, 
                 ${opacity})`
}
