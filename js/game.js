$(function(){
            var arr,n,rgbOrg,whichArr = [],score = 0;
            function arrayMaker(num){
                var i,j,auto=[];
                for(i=0;i<num;i++) {
                    for(j=0;j<num;j++) {
                        if(auto[i] === undefined){
                            auto[i] = [];
                        }
                        auto[i][j]=0;
                    }
                }
                return auto;
            }
            function tableMaker(len,item){
                var i,j,tableBody='',tableTr='';
                for(i=0;i<len;i++) {
                    tableTr += "<td></td>"
                }
                tableTr = "<tr>"+tableTr+"</tr>";
                for(i=0;i<len;i++) {
                    tableBody += tableTr;
                }
                $(item).html(tableBody);
            }
            var roll = function(){
                return {
                    forLeftVertical:function(arr){
                        var arrlike = [];
                        for(var i=0 ;i<arr.length;i++){
                            for(var k=0;k<arr[i].length;k++){
                                if(!arrlike[k]){
                                    arrlike[k] = [];
                                }
                                arrlike[i][k] = arr[k][i];
                            }
                        }
                        arr = this.forUpRow(arrlike);
                        for(var i=0 ;i<arr.length;i++){
                            for(var k=0;k<arr[i].length;k++){
                                arrlike[i][k] = arr[k][i];
                            }
                        }

                        return arrlike;
                    },
                    forRightVertical:function(arr){
                        var arrlike = [];
                        for(var i=0 ;i<arr.length;i++){
                            for(var k=0;k<arr[i].length;k++){
                                if(!arrlike[k]){
                                    arrlike[k] = [];
                                }
                                arrlike[i][k] = arr[k][i];
                            }
                        }
                        arr = this.forDownRow(arrlike);
                        for(var i=0 ;i<arr.length;i++){
                            for(var k=0;k<arr[i].length;k++){
                                arrlike[k][i] = arr[i][k];
                            }
                        }
                        return arrlike;
                    },
                    forDownRow:function(arr){
                        arr = this.arrange(arr,true);
                        for(i=0 ;i<arr.length;i++){
                            for(k=arr[i].length;k>0;k--){
                                if(arr[i][k]==arr[i][k-1]&&arr[i][k]!==0){
                                    arr[i][k]+=arr[i][k-1];
                                    arr[i].splice(k-1,1);
                                    arr[i].unshift(0);
                                }
                            }
                        }
                        return arr;
                    },
                    forUpRow:function(arr){
                        arr = this.arrange(arr,false);
                        for(i=0 ;i<arr.length;i++){
                            for(k=0;k<arr[i].length;k++){
                                if(arr[i][k]==arr[i][k-1]&&arr[i][k]!==0){
                                    arr[i][k]+=arr[i][k-1];
                                    arr[i].splice(k-1,1);
                                    arr[i].push(0);
                                }
                            }
                        }
                        return arr;
                    },
                    arrange:function(arr,down){
                        var cloneArr = [],len;
                        for(var i=0 ;i<arr.length;i++){
                            for(var k=0;k<arr[i].length;k++){
                                if(!cloneArr[i]){cloneArr[i] = [];}
                                if(arr[i][k]!==0){
                                    cloneArr[i].push(arr[i][k]);
                                }
                            }
                        }
                        for(i=0 ;i<arr.length;i++){
                            if(!cloneArr[i]){console.log(cloneArr,i);}
                            len = arr.length - cloneArr[i].length;
                            for(k=0;k<len;k++){
                                if(down){
                                    cloneArr[i].unshift(0);
                                }else{
                                    cloneArr[i].push(0);
                                }
                            }
                        }
                        return cloneArr;
                    }
                }
            }();
            function showArr(it,arr){
                $(it).find("tr").each(function(i,tr){
                    $(tr).find("td").each(function(j,td){
                        n = Math.log(arr[j][i])/Math.LN2>0?Math.log(arr[j][i])/Math.LN2:0;
                        n = n>15?15:n;
                        rgbOrg = ((15-n)/15)*230;
                        $(td).css({"background-color":"rgb(250,"+parseInt(240-(230-rgbOrg)/2)+","+parseInt(rgbOrg)+")"})
                            .text(arr[j][i]===0?'':arr[j][i]);
                    });
                });
            }
            function randomForArr(arr,index){
                if(index === undefined){
                    if(arr.length>5){
                        index = 1;
                    }
                    if(arr.length>9){
                        index = 3;
                    }
                }
                whichArr = [];
                for(var i=0;i<arr.length;i++){
                    for(var j=0;j<arr[i].length;j++){
                        if(arr[i][j]===0){
                            whichArr.push({i:i,j:j});
                        }
                        score += arr[i][j];
                    }
                }
                $("#score").text(score);
                if(whichArr.length){
                    a = whichArr[parseInt(whichArr.length*Math.random())];
                    arr[a.i][a.j] = Math.random()>0.8?4:2;
                }else{
                    if(checkGameOk()){
                        var firm = confirm(" 游戏结束！ \n \n 点击确定重新开始。 \n ");
                        if(firm){
                            setTimeout(function(){
                                initGame(init);
                            },0);
                        }
                    }
                }
                if(index&&whichArr.length){
                    return randomForArr(arr,index-1);
                }else{
                    return arr;
                }
            }
            function checkGameOk(){
                for(var i=0;i<arr.length;i++){
                    for(var j=0;j<arr.length;j++){
                        if(arr[i][j]===arr[i][j+1] || arr[i][j]===(arr[i+1]?arr[i+1][j]:undefined)){
                            return false;
                        }
                    }
                }
                return true;
            }
            function actionChoice(item){
                var a;
                switch(item){
                    case "#up":
                        arr = roll.forUpRow(arr);
                        arr = randomForArr(arr);
                        break;
                    case "#right":
                        arr = roll.forRightVertical(arr);
                        arr = randomForArr(arr);
                        break;
                    case "#down":
                        arr = roll.forDownRow(arr);
                        arr = randomForArr(arr);
                        break;
                    case "#left":
                        arr = roll.forLeftVertical(arr);
                        arr = randomForArr(arr);
                        break;
                    default:
                        console.log("绑定事件错误");
                }
                showArr("#art",arr);
            }
            function bindClick(item,move,action){
                $(item).on(move,function(){
                    action(item,this);
                });
            }
            function initGame(initData){
                $("#select").val(initData.arrLength);
                arr = arrayMaker(initData.arrLength);
                tableMaker(arr.length,initData.showTable);
                arr = randomForArr(arr,initData.randomNum);
                showArr(initData.showTable,arr);
                bindClick("#up","click",actionChoice);
                bindClick("#right","click",actionChoice);
                bindClick("#down","click",actionChoice);
                bindClick("#left","click",actionChoice);
            }
            var init = {
                arrLength:4,//矩阵长度
                randomNum:2,//初始数目
                showTable:"#art"//展示到此table
            };
            initGame(init);
            bindClick("#select","change",function(item,that){
                initGame({
                    arrLength:$(that).val(),
                    randomNum:2,
                    showTable:"#art"
                });
            });
        });
