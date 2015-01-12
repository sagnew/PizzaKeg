var ordrin = require('ordrin-api');
var array = require('array-extended');
var request = require('request');

var ordrin_api = new  ordrin.APIs('lWTtLN-VlscFum_EuSgqguuhP5WNdwTKWRblNGGAH-Y', ordrin.TEST);

/*This function places the order with the given restaurnt id and tray.
 * It also calculates a tip on the fly based on 20% gratuity with the given price.
 */
function place_pizza_order(rid,tray,price) {
    var args = {
        rid: rid.toString(),
        em: 'detox27@gmail.com',
        tray: tray,
        //tip: '6.66',
        tip: (parseFloat(price,10)*.2).toFixed(2).toString(),
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

/*This function takes the given restaurant id and passes it to the ordrin foodbot TextSearch endpoint.
 * The target variable in the query string represents the string we're searching for. In this case we are
 * ordering a pizza so we take the first tray item that exists since this request yields the most relevant
 * items first. This function then passes the tray item, price, and restaurant id to the place_pizza_order
 * function.
 */
function get_tray_info(rid) {
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
                    break;
                }
            }
        }
        else{
            console.log(error);
        }
    });

}

/*This function sends a request to the Ordrin delivery list endpoint in order to get
 * all the piza serving restaurants that deliver to the given address. It then picks a random restaurant
 * from this list and passes the restaurant id to the get_tray_info function which is used to build the order
 */
function order_pizza() {
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
            if(restaurants[index].hasOwnProperty('cu')){
                if(array(array(restaurants[index].cu).intersect(cuisines))._value.length >=1){
                    relative_rids.push(restaurants[index].id);
                }
            }
        }
        var rand_rid_index = Object.keys(relative_rids)[Math.floor(Math.random()*relative_rids.length)];
        var rid = relative_rids[rand_rid_index];
        get_tray_info(rid);

    });
}

module.exports = order_pizza;
