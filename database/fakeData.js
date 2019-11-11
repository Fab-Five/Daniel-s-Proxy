const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter()
function booleanGenerator() {
  return Math.random() >= 0.5;
}

function dataWriter(id,resId){
  let itemName = faker.lorem.words();
  let description = faker.lorem.sentence();
  let price=faker.random.number();
  let image = faker.image.food();
  let popular = booleanGenerator();
  let special = booleanGenerator();
  let restaurant_id=resId
  let type = ()=>{
    arr=[]
    var types= Math.floor(Math.random()*9)+1;
    for (var i=0; i<types;i++){
      let type=faker.lorem.words();
      let extraPrice=faker.random.number();
      arr.push({"name":type,"price":extraPrice})
    }
    return arr
  }
  let data = {
      "_id": id,
      "item_name": itemName,
      "price":price,
      "popular":popular,
      "special_instructions": special,
      "description": description,
      "extras":`{
        type:${type()},
        "default": undefined
      }`,
      "restaurant_id":restaurant_id,
      "photo_URL": image
  };
  return data
}
function generateMenu( callback) {
  var start=new Date()
  console.log(start)
   writer.pipe(fs.createWriteStream('menu.csv'));
  let i = 0;
  var resI=0;
  write();
  function write(){
    let ok = true;
    do{
      i++
      if((i%10)==0){
        resI++
      }
      let data=dataWriter(i,resI)
      if (i===10000000){
        writer.write(data, callback)
      }else {
        ok=writer.write(data)
      }
    } while (i < 10000001 && ok);
    if(i<10000001){
      writer.once('drain',write);
    }
  }
}


generateMenu( ()=>console.log(new Date(), 'done writing'));

// const seed= ()=>{
//   menu.collection.drop();
//   menu.insertMany(menus)
//   .catch(e => console.log(e));
// }
// seed();