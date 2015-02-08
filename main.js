$(document).ready(function() {
  
    var build_leaders = function(){
      //Replace with your own spreadsheet
       var url = "https://spreadsheets.google.com/feeds/list/0AnjeRrMvZrz4dEhJU1BCRk1JZDNPcHRDN3lHVldISWc/od6/public/values?alt=json-in-script&callback=?";
        //var url = 'k-test2.json';
        $.getJSON(url,{}, function (d) { //console.log(d);
                  listhorse(d);
                  });
    };
    
    //Refress the Board
    var listhorse = function (json) {
        var data = json.feed.entry;

        //Prepopulated list of horses and Real odds, and amount betted within the pool
        var horses = [{"number" : "1", "name" : "Black Onyx", "bet": 0, "odds": 0, "rOdds": "SCR"},
                        {"number" : "2", "name" : "Oxbow", "bet": 0, "odds": 0, "rOdds": "25-1"},
                        {"number" : "3", "name" : "Revolutionary", "bet": 0, "odds": 0, "rOdds": "5-1"},
                        {"number" : "4", "name" : "Golden Soul", "bet": 0, "odds": 0, "rOdds": "32-1"},
                        {"number" : "5", "name" : "Normandy Invasion", "bet": 0, "odds": 0, "rOdds": "8-1"},
                        {"number" : "6", "name" : "Mylute", "bet": 0, "odds": 0, "rOdds": "14-1"},
                        {"number" : "7", "name" : "Giant Finish", "bet": 0, "odds": 0, "rOdds": "44-1"},
                        {"number" : "8", "name" : "Goldencents", "bet": 0, "odds": 0, "rOdds": "5-1"},
                        {"number" : "9", "name" : "Overanalyze", "bet": 0, "odds": 0, "rOdds": "14-1"},
                        {"number" : "10", "name" : "Palace Malice", "bet": 0, "odds": 0, "rOdds": "26-1"},
                        {"number" : "11", "name" : "Lines of Battle", "bet": 0, "odds": 0, "rOdds": "11-1"},
                        {"number" : "12", "name" : "Itsmyluckyday", "bet": 0, "odds": 0, "rOdds": "42-1"},
                        {"number" : "13", "name" : "Falling Sky", "bet": 0, "odds": 0, "rOdds": "50-1"},
                        {"number" : "14", "name" : "Verrazano", "bet": 0, "odds": 0, "rOdds": "11-1"},
                        {"number" : "15", "name" : "Charming Kitten", "bet": 0, "odds": 0, "rOdds": "33-1"},
                        {"number" : "16", "name" : "Orb", "bet": 0, "odds": 0, "rOdds": "6-1"},
                        {"number" : "17", "name" : "Will Take Charge", "bet": 0, "odds": 0, "rOdds": "30-1"},
                        {"number" : "18", "name" : "Frac Daddy", "bet": 0, "odds": 0, "rOdds": "15-1"},
                        {"number" : "19", "name" : "Java's War", "bet": 0, "odds": 0, "rOdds": "25-1"},
                        {"number" : "20", "name" : "Vyjack", "bet": 0, "odds": 0, "rOdds": "44-1"},
                        {"number" : "21", "name" : "Fear the Kitten", "bet": 0, "odds": 0, "rOdds": "SCR"}];
        
        //Initialize total betted sum
        var sum = 0;
        
        
        //Loop through bets and add bet to appropriate horse if contributing money
        for (var i=0;i<data.length;i++) {
            var found = false;
            if(data[i].gsx$willyoubeplayingformoney.$t == "Yes"){
            var nbet = parseInt(data[i].gsx$whatisyourbetamount.$t, 10);
            sum = sum + nbet;
            for (var h=0;h<horses.length;h++){
               if (horses[h].name == data[i].gsx$thewinninghorse.$t){
                    horses[h].bet = horses[h].bet + nbet;
                     found = true;
                   break;
               }
            }
            
            }
       }

       //Display total pool amount
       $(".total span").text(sum);
       
       //Calculate Odds perhorse
       for (var c=0;c<horses.length;c++) {
         horses[c].odds = 1/(1-(sum-horses[c].bet)/sum);
       }
       
       horses.sort(function (a,b) {
    if (a.bet < b.bet) return  1;
    if (a.bet > b.bet) return -1;
    return 0;
});
        for (var e=0;e<horses.length;e++){
            if(horses[e].bet != 0) {
                $('<tr/>').html('<td>'+horses[e].number+'</td><td>'+horses[e].name + '</td><td>'+horses[e].bet+'</td><td>'+ horses[e].odds.toFixed() +' - 1 </td><td>'+horses[e].rOdds+'</td>').hide().appendTo('table.bets').fadeIn("slow");
               // $().append();
           }
            
            if(horses[e].rOdds == "SCR"){
                $('table.screened').append($('<tr/>').html('<td>'+horses[e].number+'</td><td>'+horses[e].name + '</td>'));
            }
        }
    };


function myOdds(odds){
    short = odds.toFixed(1);
    r = short % 1;
    t = r.toFixed(1)*10;
    odd = parseInt(odds, 10);

            if (t > 0 && t % 2 == 0){
                odd = odd*5;
                d = 5;
            } else if (t % 5 == 0){
                odd = odd*2;
                d = 2;
            } else {
                odd = odd*t;
                d = t;
            }
    return odd +'-' + d;
    }
    


var clearboard = function() {
    $("table tr").not("tr:first").fadeOut("slow");
    $("table tr").not("tr:first").remove();
    
};


  build_leaders();
 setInterval(function(){
    clearboard();
   build_leaders();

            },60000);
});