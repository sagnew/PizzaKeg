var ordrin = require('ordrin-api');
var array = require('array-extended');
var request = require('request');

var ordrin_api = new  ordrin.APIs('lWTtLN-VlscFum_EuSgqguuhP5WNdwTKWRblNGGAH-Y', ordrin.TEST);


function place_pizza_order(rid,tray,price){
    var args = {
        rid: rid,
        em: 'sam@slam-minded.org',
        tray: tray,
        tip: (parseFloat(price,10)*.2).toString(),
        first_name: 'Slammin',
        last_name: 'Sammy',
        phone: '6666666666',
        addr: '31 High Street',
        city: 'New Brunswick',
        zip: '08901',
        card_name: 'Slammin Sammy',
        card_number: '000000000000000',
        card_cvc: '123',
        card_expiry: '06/2006',
        card_bill_addr: '31 High Street',
        card_bill_city: 'New Brunswick',
        card_bill_state: 'New Jersey',
        card_bill_zip: '08901',
        card_bill_phone: '5555555555',
        delivery_date: 'ASAP'
    };
    ordrin_api.order_guest(args, function(error,data){
        if(error){
            console.log(error);
        }
        else{
            console.log(data);
        }

    });

}

function get_tray_info(rid){
    var url = 'http://foodbot.ordr.in:8000/TextesttSearch?rid='+rid+'&target=pie';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            tray = body[0]['tray'];
            price = body[0]['price'];
            place_pizza_order(rid,tray,price);
        }
    });

}

/*Go through restauraunt delivery list, find all restauraunts that serve Italian food or Pizza
 * Then Will need to build a list of all restauruants that deliver that serve Pizza
 */
function order_pizza(){
    var args = {
        datetime: 'ASAP',
        addr: '31 High Street',
        city: 'New Brunswick',
        zip: '08901'
    };
    ordrin_api.delivery_list(args,function(error,restaurants){
        relative_rids = [];
        var cuisines = ['Italian','Pizza'];
        for(index in restaurants){
            //Takes the intersection bewteen the cusines for each restauruant and the var cuisines
            //( ͡° ͜ʖ ͡°)
            //( ͡° ͜ʖ ͡°)
            if(array(array(restaurants[index].cu).intersect(cuisines))._value.length >=1){
                relative_rids.push(restaurants[index].id);
            }
        }
        var rand_rid_index = Object.keys(relative_rids)[Math.floor(Math.random()*relative_rids.length)];
        console.log(relative_rids[rand_rid_index]);
        var rid = relative_rids[rand_rid_index];
        get_tray_info(rid);

    });
}

