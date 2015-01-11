var ordrin = require('ordrin-api');
var array = require('array-extended');
var request = require('request');

var ordrin_api = new  ordrin.APIs('lWTtLN-VlscFum_EuSgqguuhP5WNdwTKWRblNGGAH-Y', ordrin.TEST);

function place_pizza_order(rid,tray,price){
    var tip = parseFloat(price,10)*.2.toFixed(2);
    console.log(tip);
    var args = {
        rid: rid.toString(),
        em: 'detox27@gmail.com',
        tray: tray,
        //tip: (parseFloat(price,10)*.2).round(2).toString(),
        tip: '6.66',
        first_name: 'Slammin',
        last_name: 'Sammy',
        phone: '6666666666',
        zip: '10036',
        addr: '1500 Broadway',
        city: 'New York',
        state: 'NY',
        card_name: 'Slammin Sammy',
        card_number: '4111111111111111',
        card_cvc: '123',
        card_expiry: '06/2006',
        card_bill_addr: '31 High Street',
        card_bill_city: 'New Brunswick',
        card_bill_state: 'NJ',
        card_bill_zip: '08901',
        card_bill_phone: '5555555555',
        delivery_date: 'ASAP'
    };
    ordrin_api.order_guest(args, function(error,data){
        if(error){
            console.log(error);
        }
        else{
            console.log('Order Successful');
        }

    });

}

function get_tray_info(rid){
    var url = 'http://foodbot.ordr.in:8000/TextSearch?rid='+rid+'&target=pizza pie';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            for(var i=0; i<body.length; i++){
                if(body[i].tray){
                    tray = body[i].tray;
                    price = body[i].price;
                    place_pizza_order(rid,tray,price);
                    console.log([tray,price]);
                    break;
                }
            }
        }
        else{
            console.log(error);
        }
    });

}

/*Go through restauraunt delivery list, find all restauraunts that serve Italian food or Pizza
 * Then Will need to build a list of all restauruants that deliver that serve Pizza
 */
function order_pizza(){
    var args = {
        datetime: 'ASAP',
        addr: '1515 Broadway',
        city: 'New York',
        zip: '10036'
    };
    ordrin_api.delivery_list(args,function(error,restaurants){
        relative_rids = [];
        var cuisines = ['Italian','Pizza'];
        for(index in restaurants){
            //Takes the intersection bewteen the cuisines for each restauruant and the var cuisines
            //( ͡° ͜ʖ ͡°)
            //( ͡° ͜ʖ ͡°)
            //console.log(array(restaurants[index].cu);
            if(restaurants[index].hasOwnProperty('cu')){
                if(array(array(restaurants[index].cu).intersect(cuisines))._value.length >=1){
                    relative_rids.push(restaurants[index].id);
                }
            }
        }
        var rand_rid_index = Object.keys(relative_rids)[Math.floor(Math.random()*relative_rids.length)];
        console.log(relative_rids[rand_rid_index]);
        var rid = relative_rids[rand_rid_index];
        get_tray_info(rid);

    });
}

order_pizza();
