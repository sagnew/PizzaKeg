var ordrin = require('ordrin-api');
var array = require("array-extended");
var ordrin_api = new  ordrin.APIs('lWTtLN-VlscFum_EuSgqguuhP5WNdwTKWRblNGGAH-Y', ordrin.TEST);

var args = {
    datetime: 'ASAP',
    addr: '31 High Street',
    city: 'New Brunswick',
    zip: '08901'
};

/*Go through restauraunt delivery list, find all restauraunts that serve Italian food or Pizza
 * Then Will need to build a list of all restauruants that deliver that serve Pizza
 */
ordrin_api.delivery_list(args,function(error,restaurants){
    var cuisines = ['Italian','Pizza'], relative_rids = [];
    for(index in restaurants){
        //Takes the intersection bewteen the cusines for each restauruant and the var cuisines
        //( ͡° ͜ʖ ͡°)
        //( ͡° ͜ʖ ͡°)
        if(array(array(restaurants[index].cu).intersect(cuisines))._value.length >=1){
            if(!restaurants[index].is_delivering){
                relative_rids.push(restaurants[index].id);
            }
        }
    }
    console.log(relative_rids);
});
