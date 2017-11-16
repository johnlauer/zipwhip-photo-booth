$('body').css('background-image', 'url(/images/cloud-background.png)');




$(function(){
 
    var dials = $(".dials ol li");
    var index;
    var number = $(".number");
    var total;
    var complete = false;

    $(".number").bind('DOMSubtreeModified', function() {
        console.log(number.text().length)
        if(number.text().length === 10){
                var digits = $(this).text();
                digits = digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                $(this).html(digits);
                setTimeout(function(){
                
                window.location = "#/booth/"+number.text();
            }, 1000);
            complete = true;
        }
    });


    dials.click(function(){

        if(complete || number.text().length > 14){
            return;
        }

        index = dials.index(this);
		var dtmf_num = index + 1;
		
        if(index == 9){
 
            //number.append("*");
 
        }else if(index == 10){
 
            number.append("0");
 
        }else if(index == 11){
 
            //number.append("#");
 
        }else if(index == 12){
 
            number.empty();
 
        }else if(index == 13){
 
            total = number.text();
            total = total.slice(0,-1);
            number.empty().append(total);
 
        }else if(index == 14){
            
            if(number.text().length < 13){
                return;
            }

            window.location = "#/booth/"+number.text();
 
        }else if(number.text().length < 14){
          number.append(index+1);
          if(number.text().length === 10){
                complete = true;
          }
        }
		
		var dtmf_numstr = dtmf_num + "";
		if (dtmf_num == 10) dtmf_numstr = "star";
		if (dtmf_num == 11) dtmf_numstr = "0";
		if (dtmf_num == 12) dtmf_numstr = "hash";
		if (dtmf_num == 13) dtmf_numstr = "star";
		if (dtmf_num == 14) dtmf_numstr = "hash";
		var dtmf_file = "dtmf-" + dtmf_numstr + ".mp3";
		console.log("playing ", dtmf_file);
		var dtmf = new Audio('/audio/dtmf/' + dtmf_file);
		dtmf.play();
    });
 
 /*   $(document).keydown(function(e){
        if(number.text().length > 13){
            return;
        }

        switch(e.which){
 
            case 96:
 
                number.append("0");
                break;
 
            case 97:
 
                number.append("1");
                break;
 
            case 98:
 
                number.append("2");
                break;
 
            case 99:
 
                number.append("3");
                break;
 
            case 100:
 
                number.append("4");
                break;
 
            case 101:
 
                number.append("5");
                break;
 
            case 102:
 
                number.append("6");
                break;
 
            case 103:
 
                number.append("7");
                break;
 
            case 104:
 
                number.append("8");
                break;
 
            case 105:
 
                number.append("9");
                break;
 
            case 8:
 
                total = number.text();
                total = total.slice(0,-1);
                number.empty().append(total);
                break;
 
            case 27:
 
                number.empty();
                break;
 
            case 106:
 
                //number.append("*");
                break;
 
            case 35:
 
                //number.append("#");
                break;
 
            case 13:
 
                $('.pad-action').click();
                break;
 
            default: return;
        }
 
        e.preventDefault();
    });*/
});