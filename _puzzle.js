var time=0;
var pause=true;
var set_timer;
var d=new Array(10);
//保存当前位置中的id值
var d_direct=new Array(
    [0],//为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用
    [2,4],//大DIV编号为1的DIV可以去的位置，比如第一块可以去2,4号位置
    [1,3,5],
    [2,6],
    [1,5,7],
    [2,4,6,8],
    [3,5,9],
    [4,8],
    [5,7,9],
    [6,8]
);//保存大DIV编号的可移动位置编号
var d_posXY=new Array(
    [0],//同样，我们不使用第一个元素
    [0,0],//第一个表示left,第二个表示top，比如第一块的位置为let:0px,top:0px
    [150,0],
    [300,0],
    [0,150],
    [150,150],
    [300,150],
    [0,300],
    [150,300],
    [300,300]
);//大DIV编号的位置
///console.log(d_posXY[1][0])
//console.log(d_posXY[1][1])
//console.log(d_posXY[2][0])
//console.log(d_posXY)
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
//默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块

function move(id){
    var i=1;
    for(i=1;i<10;++i){
        if(d[i]== id){
            break;}
    }

    var target_d=0;
    target_d=wherecanto(i);
    if(target_d!=0){
        d[i]=0;
        d[target_d]=id;
        document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
        document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
    }
    
    var finish=true;
    for(var k=1;k<9;++k){
        if(d[k]!=k){
            finish=false;
            break;
        }
         
    }

    if(finish==true){
        if(!pause){
            start();
        }
        alert('congratulations!');
          
    }
    
}

function wherecanto(cur_div){
    var j=0;
    var move_flag=false;
    for(j=0;j<d_direct[cur_div].length;++j){
        if(d[d_direct[cur_div][j]]==0){
            move_flag=true 
            break;
        }

    }
    if (move_flag==true){
        return d_direct[cur_div][j];
    }else{
        return 0;
    }

}

function timer(){
    time+=1;
    var min=parseInt(time/60);
    var sec=time%60;
    document.getElementById('timer').innerHTML=min+'分'+sec+'秒'
}

function _window(){
	var r=confirm("是否继续？");
	if (r==false){
		reset();
	}
}

function start(){
    if(pause){
        document.getElementById('start').innerHTML='开始';
        pause=false;
        set_timer=setInterval(timer,1000);
        }
               
}

function reset(){
    time=0;//把时间设置为0
    random_d();//把方块随机打乱函数
    if(pause)//如果暂停，则开始计时
        start();
}



function random_d(){
  for(var i=9;i>1 ;--i){
      var to=parseInt(Math.random()*(i-1)+1);
      if(d[i]!=0){
          document.getElementById('d'+d[i]).style.left=d_posXY[to][0]+'px';
          document.getElementById('d'+d[i]).style.top=d_posXY[to][1]+'px'
      }
      if(d[to]!=0){
          document.getElementById('d'+d[to]).style.left=d_posXY[i][0]+'px';
          document.getElementById('d'+d[to]).style.top=d_posXY[i][1]+'px'
      }
      var tem=d[to]
      d[to]=d[i];
      d[i]=tem;
    }
}

window.onload=function(){
    reset();
}