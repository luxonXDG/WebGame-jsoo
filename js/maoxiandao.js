var playArea = document.getElementById("playArea");//获取游戏区域
var xianShiXueLiang = document.getElementById("xianShiXueLiang");//获取显示血量的span
var xianShiFengShu = document.getElementById("xianShiFengShu");//获取显示分数的span
var xianShiJingYan = document.getElementById("xianShiJingYan");//获取显示经验的span
var JiNengXianShi = document.getElementById("JiNengXianShi");//获取显示技能的图标
var bgmus = document.getElementById("bgmus");//获取背景音乐
var caozuo = document.getElementById("caozuo");//操作音效
var longShouJI = document.getElementById("longShouJI");//被击中效果
var longShenJi = document.getElementById("longShenJi");//升级音效
var BossChuJi = document.getElementById("BossChuJi");//BOSS射击音效
var DaZhao = document.getElementById("DaZhao");//大招音效
var BossDie = document.getElementById("BossDie");//boss死亡
var wanJiaJueSe ;//储存玩家角色
var Boss;//储存BOSS角色
var daJueXiaoGuo = [];//储存大招
var moveWanJiaTime;//玩家移动计时器
var moveZiDanTime;//玩家子弹移动计时器
var isLeft = isRight = isDown = isUp = isGongji= false;//判断用户是否按下键
var wanJiaJueSeZhuangTai = ["img/dragon/small/stand.gif","img/dragon/middle/stand.gif","img/dragon/big/stand.gif","img/dragon/large/stand.gif","img/dragon/final/stand.gif"];//玩家角色形态图片路径
var wanJiaWuQiXiaoGuo = ["img/dragon/small/att.gif","img/dragon/middle/att.gif","img/dragon/big/att.gif","img/dragon/large/att.gif","img/dragon/final/att.gif"];//玩家角色攻击子弹图片路径
var wanJiaBaoZhaArr = ["img/dragon/small/hit.gif","img/dragon/middle/hit.gif","img/dragon/big/hit.gif","img/dragon/large/hit.gif","img/dragon/final/hit.gif"];//玩家角色击中爆炸图片
var wanJiaGongJiDongZuo = ["img/dragon/small/magicmissile.gif","img/dragon/middle/magicmissile.gif","img/dragon/big/magicmissile.gif","img/dragon/large/magicmissile.gif","img/dragon/final/magicmissile.gif"];//玩家角色攻击动作路径
var sheJiZiDanArr = [];//玩家射击子弹数组
var birdArr = [];//储存鸟数组
var planeArr = [];//储存飞机数组
var ghostArr = [];//储存幽灵数组
var speedArr = [5,10,15];//随机速度数组
var baoZhaArr = [];//爆炸效果数组
var baoXiangArr = [];//储存宝箱数组
var BossPaoArr = [];//BOSS炮弹数组
var shejiPinglvTime;//射击频率计时器
var createBirdTime;//创建鸟计时器
var createplaneTime;//创建飞机计时器
var createghostTime;//创建幽灵计时器
var moveGuaiTime;//移动怪物计时器
var checkZiDanPengZhuangTime;//子弹碰撞判断计时器
var qingChuSiWangTime;//清除死亡计时器
var clearBaoZhaTime;//清除爆炸效果计时器
var checkGuaiAndWanJiaPengZhuangTime;//判断玩家于怪物碰撞计时器
var wanJiaShengJiTime;//玩家升级计时器
var wanJiaAndBaoXiangTime;//玩家宝箱碰撞计时器
var wanJiaDaZhaoTime;//玩家大招计时器
var BossChuXianLTime;//BOSS出现左移动计时器
var BossGongJiTime;//BOSS攻击计时器
var BossGongJiQianYaoTime;//BOSS攻击前摇
var BossPaoMoveTime;//BOSS炮弹移动计时器
var BossImgFanHuiTime;//BOSS动画返回计时器
var jiNengImgTime;//玩家技能图标显示计时器
var BossPaoFaSheTime;//boss炮弹发射频率计时器
start();
//开始游戏加载
function start(){
    createWanJiaJueSe();//调用创建玩家角色
    addKeyEvent();
    moveWanJiaTime = setInterval(moveWanJiaJueSe,50);//玩家角色移动
    moveZiDanTime = setInterval(moveZiDan,100);//玩家子弹移动
    shejiPinglvTime = setInterval(sheji,600);//攻击频率
    createBirdTime = setInterval(createBird,1);//创建鸟
    createplaneTime = setInterval(createPlane,1);//创建飞机
    createghostTime = setInterval(createGhost,1);//创建幽灵
    moveGuaiTime = setInterval(moveGuai,100);//移动怪物
    checkZiDanPengZhuangTime = setInterval(checkZiDanPengZhuang,100);//子弹判断
    qingChuSiWangTime = setInterval(qingChuSiWang,1500);//清除死亡
    clearBaoZhaTime = setInterval(clearBaoZha,800);//清除爆炸效果
    checkGuaiAndWanJiaPengZhuangTime = setInterval(checkGuaiAndWanJiaPengZhuang,50);//玩家于怪物碰撞判断
    wanJiaShengJiTime = setInterval(GameExPanDuan,100);//玩家升级判断
    wanJiaAndBaoXiangTime = setInterval(wanJianAneBaoXiangPengZhuang,100);//玩家宝箱碰撞判断
    jiNengImgTime = setInterval(jiNengImg,100);//技能图标剩余显示
    bgmus.play();//加载背景音乐
    // wanJiaDaZhaoTime = setInterval(clearDaZhao,3400);//清除大招
    longShouJI.src="mus/longshouji.mp3";
}
//BOSS图片返回
function BossImgFanHui(){
    if(Boss != undefined){
        Boss.imgNode.src ="img/enemy/boss/move.gif";
        clearInterval(BossGongJiTime);
        clearInterval(BossPaoFaSheTime);
        clearInterval(BossImgFanHuiTime);
        BossGongJiTime = setInterval(BossGongJi,1);//BOSS攻击动画
        BossPaoFaSheTime = setInterval(BossFaShe,1);//BOSS发射炮弹
        BossImgFanHuiTime = setInterval(BossImgFanHui,1)//BOSS动画清除
    }
}
//BOSS炮弹的移动
function moveBossPaoDan(){
        for(var i = 0; i < BossPaoArr.length;i++){
            if(parseInt(BossPaoArr[i].imgNode.style.left) < - 40){
                playArea.removeChild(BossPaoArr[i].imgNode);
                BossPaoArr.splice(i,1);
                i--;
            }
            else{
                BossPaoArr[i].moveLeft();
            }
        }
}
//BOSS攻击动画
function BossGongJi(){
    if(Boss != undefined){
        Boss.imgNode.src ="img/enemy/boss/attack.gif";
    }
}
//BOSS发射出炮弹
function BossFaShe(){
    if(Boss != undefined){
        Boss.shootYouYu()
    }
}
//Boss出现的移动
function moveBossL(){
    if(Boss != undefined){
        Boss.moveLeft();
    }
}
//游戏经验判断
function GameExPanDuan(){
    if(wanJiaJueSe.jingYan >= 100 && wanJiaJueSe.dengJi == 1){
        wanJiaJueSe.dengJi++;
        wanJiaJueSe.imgNode.src = wanJiaJueSeZhuangTai[wanJiaJueSe.dengJi-1];
        wanJiaJueSe.blood += 60;
        longShenJi.src = "mus/lbw/sj1.mp3";
        longShenJi.play();
        if(wanJiaJueSe.daJue < 7){
            wanJiaJueSe.daJue++;
        }
    }
    else if(wanJiaJueSe.jingYan >= 200 && wanJiaJueSe.dengJi == 2){
        wanJiaJueSe.dengJi++;
        wanJiaJueSe.imgNode.src = wanJiaJueSeZhuangTai[wanJiaJueSe.dengJi-1];
        wanJiaJueSe.blood += 70;
        longShenJi.src = "mus/qiezi/sj2.mp3";
        longShenJi.play();
        if(wanJiaJueSe.daJue < 7){
            wanJiaJueSe.daJue++;
        }
    }
    else if(wanJiaJueSe.jingYan >= 300 && wanJiaJueSe.dengJi == 3){
        wanJiaJueSe.dengJi++;
        wanJiaJueSe.imgNode.src = wanJiaJueSeZhuangTai[wanJiaJueSe.dengJi-1];
        wanJiaJueSe.blood += 80;
        longShenJi.src = "mus/qiezi/sj3.mp3";
        longShenJi.play();
        if(wanJiaJueSe.daJue < 7){
            wanJiaJueSe.daJue++;
        }
        createBoss();
        BossChuXianLTime = setInterval(moveBossL,100);//boss出现向左移动
        BossPaoMoveTime = setInterval(moveBossPaoDan,100);//BOSS炮弹移动
        BossGongJiTime = setInterval(BossGongJi,8000);//BOSS攻击动画
        BossPaoFaSheTime = setInterval(BossFaShe,9000);//BOSS发射炮弹
        BossImgFanHuiTime = setInterval(BossImgFanHui,9200)//BOSS动画清除
    }
    else if(wanJiaJueSe.jingYan >= 400 && wanJiaJueSe.dengJi == 4){
        wanJiaJueSe.dengJi++;
        wanJiaJueSe.imgNode.src = wanJiaJueSeZhuangTai[wanJiaJueSe.dengJi-1];
        wanJiaJueSe.blood += 80;
        longShenJi.src = "mus/qiezi/sj4.mp3";
        longShenJi.play();
        if(wanJiaJueSe.daJue < 7){
            wanJiaJueSe.daJue++;
        }
    }
}
//判断敌人和角色碰撞
function checkGuaiAndWanJiaPengZhuang(){
        var wanJiaLeft = parseInt(wanJiaJueSe.imgNode.style.left);
        var wanJiaTop = parseInt(wanJiaJueSe.imgNode.style.top);
        var wanJiaWidth = parseInt(wanJiaJueSe.imgNode.clientWidth);
        var wanJiaHeight = parseInt(wanJiaJueSe.imgNode.clientHeight);
        for(var j = 0;j <birdArr.length;j++){
            var birdLeft = parseInt(birdArr[j].imgNode.style.left);
            var birdTop = parseInt(birdArr[j].imgNode.style.top);
            var birdWidth = parseInt(birdArr[j].imgNode.clientWidth);
            var birdHeight = parseInt(birdArr[j].imgNode.clientHeight);
            if(birdArr[j].isDead == false &&
                (wanJiaLeft > birdLeft - wanJiaWidth && wanJiaLeft < birdLeft + birdWidth)
                && (wanJiaTop > birdTop - wanJiaHeight && wanJiaTop < birdTop + birdHeight)){
                    birdArr[j].blood--;
                    wanJiaJueSe.fengShu++;
                    wanJiaJueSe.blood-=100000;
                    if(birdArr[j].blood <= 0){
                        birdArr[j].imgNode.src = "img/enemy/bird/die.gif";
                        birdArr[j].isDead = true;
                    }
                    j--;
                }
        }
        for(var x = 0;x <planeArr.length;x++){
            var planeLeft = parseInt(planeArr[x].imgNode.style.left);
            var planeTop = parseInt(planeArr[x].imgNode.style.top);
            var planeWidth = parseInt(planeArr[x].imgNode.clientWidth);
            var planeHeight = parseInt(planeArr[x].imgNode.clientHeight);
            if(planeArr[x].isDead == false &&
                (wanJiaLeft > planeLeft - wanJiaWidth && wanJiaLeft < planeLeft + planeWidth)
                && (wanJiaTop > planeTop - wanJiaHeight && wanJiaTop < planeTop + planeHeight)){
                    planeArr[x].blood--;
                    wanJiaJueSe.fengShu++;
                    wanJiaJueSe.blood-=100000;
                    if(planeArr[x].blood <= 0){
                        planeArr[x].imgNode.src = "img/enemy/plane/die.gif";
                        planeArr[x].isDead = true;
                    }
                    x--;
                }
        }
        for(var y = 0;y <ghostArr.length;y++){
            var ghostLeft = parseInt(ghostArr[y].imgNode.style.left);
            var ghostTop = parseInt(ghostArr[y].imgNode.style.top);
            var ghostWidth = parseInt(ghostArr[y].imgNode.clientWidth);
            var ghostHeight = parseInt(ghostArr[y].imgNode.clientHeight);
            if(ghostArr[y].isDead == false &&
                (wanJiaLeft > ghostLeft - wanJiaWidth && wanJiaLeft < ghostLeft + ghostWidth)
                && (wanJiaTop > ghostTop - wanJiaHeight && wanJiaTop < ghostTop + ghostHeight)){
                    ghostArr[y].blood--;
                    wanJiaJueSe.fengShu++;
                    wanJiaJueSe.blood-=100000;
                    if(ghostArr[y].blood <= 0){
                        ghostArr[y].imgNode.src = "img/enemy/ghost/die.gif";
                        ghostArr[y].isDead = true;
                    }
                    y--;
                }
        }
       if(Boss != undefined){
        for(var i = 0 ; i < BossPaoArr.length;i++){
            var paoL = parseInt(BossPaoArr[i].imgNode.style.left);
            var paoT = parseInt(BossPaoArr[i].imgNode.style.top);
            var paoW = parseInt(BossPaoArr[i].imgNode.clientWidth);
            var paoH = parseInt(BossPaoArr[i].imgNode.clientHeight);
            if((wanJiaLeft > paoL - wanJiaWidth && wanJiaLeft < paoL + paoW)
            && (wanJiaTop > paoT - wanJiaHeight && wanJiaTop < paoT + paoH)){
                wanJiaJueSe.blood -= 100000;
                longShouJI.src = "mus/qiezi/shouji.mp3";
                longShouJI.play();
                playArea.removeChild(BossPaoArr[i].imgNode);
                BossPaoArr.splice(i,1);
                addBossBaoZha(paoL,paoT);
            }
        }
       }
        xianShiXueLiang.innerHTML = wanJiaJueSe.blood;
        xianShiFengShu.innerHTML = wanJiaJueSe.fengShu;
        if(wanJiaJueSe.blood <= 0){
            alert("游戏结束");
            gameover();
        }
}
//游戏结束
function gameover(){
    clearInterval(moveWanJiaTime);
    clearInterval(moveZiDanTime);
    clearInterval(shejiPinglvTime);
    clearInterval(createBirdTime);
    clearInterval(createplaneTime);
    clearInterval(createghostTime);
    clearInterval(moveGuaiTime);
    clearInterval(checkZiDanPengZhuangTime);
    clearInterval(qingChuSiWangTime);
    clearInterval(clearBaoZhaTime);
    clearInterval(checkGuaiAndWanJiaPengZhuangTime);
    clearInterval(wanJiaShengJiTime);
    clearInterval(wanJiaAndBaoXiangTime);
    clearInterval(BossChuXianLTime);
    clearInterval(BossPaoMoveTime);
    clearInterval(BossGongJiTime);
    clearInterval(BossPaoFaSheTime);
    clearInterval(BossImgFanHuiTime);
    clearInterval(jiNengImgTime);
    //清除键盘监听事件
    document.onkeydown = null;
    document.onkeyup = null;
}
//清除死亡
function qingChuSiWang(){
    for(var i = 0;i<birdArr.length;i++){
        if(birdArr[i].isDead){
            playArea.removeChild(birdArr[i].imgNode);
            birdArr.splice(i,1);
            i--;
        }
    }
    for(var j = 0; j<planeArr.length;j++){
        if(planeArr[j].isDead){
            playArea.removeChild(planeArr[j].imgNode);
            planeArr.splice(j,1);
            j--;
        }
    }
    for(var x = 0; x<ghostArr.length;x++){
        if(ghostArr[x].isDead){
            playArea.removeChild(ghostArr[x].imgNode);
            ghostArr.splice(x,1);
            x--;
        }
    }
    if(Boss != undefined){
        if(Boss.isDead){
            playArea.removeChild(Boss.imgNode);
            Boss = null;
        }
    }
}
//判断玩家子弹碰撞
function checkZiDanPengZhuang(){
    for(var i = 0;i<sheJiZiDanArr.length;i++){
        var zidanLeft = parseInt(sheJiZiDanArr[i].imgNode.style.left);
        var zidanTop = parseInt(sheJiZiDanArr[i].imgNode.style.top);
        var zidanWidth = parseInt(sheJiZiDanArr[i].imgNode.clientWidth);
        var zidanHeight = parseInt(sheJiZiDanArr[i].imgNode.clientHeight);
        var suiJiBol =  Math.floor(Math.random()*800);
        for(var j = 0;j <birdArr.length;j++){
            var birdLeft = parseInt(birdArr[j].imgNode.style.left);
            var birdTop = parseInt(birdArr[j].imgNode.style.top);
            var birdWidth = parseInt(birdArr[j].imgNode.clientWidth);
            var birdHeight = parseInt(birdArr[j].imgNode.clientHeight);
            if(birdArr[j].isDead == false &&
                (zidanLeft > birdLeft - zidanWidth && zidanLeft < birdLeft + birdWidth)
                && (zidanTop > birdTop - zidanHeight && zidanTop < birdTop + birdHeight)){
                    playArea.removeChild(sheJiZiDanArr[i].imgNode);
                    sheJiZiDanArr.splice(i,1);
                    addBaoZha(zidanLeft,zidanTop);
                    i--;
                    wanJiaJueSe.fengShu++;
                    wanJiaJueSe.jingYan += 1;
                    birdArr[j].blood -= wanJiaJueSe.dengJi*2;
                    if(birdArr[j].blood <= 0){
                        birdArr[j].imgNode.src = "img/enemy/bird/die.gif";
                        birdArr[j].isDead = true;
                        wanJiaJueSe.jingYan += 10;
                        if(suiJiBol > 500){
                            createBaoXiang(birdLeft,birdTop);
                        }
                    }
                }
        }
        for(var x = 0;x <planeArr.length;x++){
            var planeLeft = parseInt(planeArr[x].imgNode.style.left);
            var planeTop = parseInt(planeArr[x].imgNode.style.top);
            var planeWidth = parseInt(planeArr[x].imgNode.clientWidth);
            var planeHeight = parseInt(planeArr[x].imgNode.clientHeight);
            if(planeArr[x].isDead == false &&
                (zidanLeft > planeLeft - zidanWidth && zidanLeft < planeLeft + planeWidth)
                && (zidanTop > planeTop - zidanHeight && zidanTop < planeTop + planeHeight)){
                    playArea.removeChild(sheJiZiDanArr[i].imgNode);
                    sheJiZiDanArr.splice(i,1);
                    addBaoZha(zidanLeft,zidanTop);
                    i--;
                    wanJiaJueSe.fengShu++;
                    planeArr[x].blood -= wanJiaJueSe.dengJi*2;
                    wanJiaJueSe.jingYan += 1;
                    if(planeArr[x].blood <= 0){
                        planeArr[x].imgNode.src = "img/enemy/plane/die.gif";
                        planeArr[x].isDead = true;
                        wanJiaJueSe.jingYan += 10;
                        if(suiJiBol > 500){
                            createBaoXiang(planeLeft,planeTop);
                        }
                    }
                }
        }
        for(var y = 0;y <ghostArr.length;y++){
            var ghostLeft = parseInt(ghostArr[y].imgNode.style.left);
            var ghostTop = parseInt(ghostArr[y].imgNode.style.top);
            var ghostWidth = parseInt(ghostArr[y].imgNode.clientWidth);
            var ghostHeight = parseInt(ghostArr[y].imgNode.clientHeight);
            if(ghostArr[y].isDead == false &&
                (zidanLeft > ghostLeft - zidanWidth && zidanLeft < ghostLeft + ghostWidth)
                && (zidanTop > ghostTop - zidanHeight && zidanTop < ghostTop + ghostHeight)){
                    playArea.removeChild(sheJiZiDanArr[i].imgNode);
                    sheJiZiDanArr.splice(i,1);
                    addBaoZha(zidanLeft,zidanTop);
                    i--;
                    wanJiaJueSe.fengShu++;
                    wanJiaJueSe.jingYan += 1;
                    ghostArr[y].blood-= wanJiaJueSe.dengJi*2;
                    if(ghostArr[y].blood <= 0){
                        ghostArr[y].imgNode.src = "img/enemy/ghost/die.gif";
                        ghostArr[y].isDead = true;
                        wanJiaJueSe.jingYan += 10;
                        if(suiJiBol > 500){
                            createBaoXiang(ghostLeft,ghostTop);
                        }
                    }
            }
        }
        if(Boss != undefined){
            var bossL = parseInt(Boss.imgNode.style.left);
            var bossT = parseInt(Boss.imgNode.style.top);
            var bossW = parseInt(Boss.imgNode.clientWidth);
            var bossH = parseInt(Boss.imgNode.clientHeight);
            if(Boss.isDead == false && (zidanLeft > bossL - zidanWidth && zidanLeft < bossL + bossW)
            && (zidanTop > bossT - zidanHeight && zidanTop < bossT + bossH)){
                playArea.removeChild(sheJiZiDanArr[i].imgNode);
                sheJiZiDanArr.splice(i,1);
                addBaoZha(zidanLeft,zidanTop);
                i--;
                wanJiaJueSe.fengShu++;
                wanJiaJueSe.jingYan += 1;
                Boss.blood -= wanJiaJueSe.dengJi*2;
                if(Boss.blood <= 0){
                    Boss.imgNode.src = "img/enemy/boss/die.gif";
                    Boss.isDead = true;
                    wanJiaJueSe.jingYan += 100;
                    BossDie.src ="mus/lbw/bossdie.mp3";
                    BossDie.play();
                }
            }
        }
        xianShiFengShu.innerHTML = wanJiaJueSe.fengShu;
        xianShiJingYan.innerHTML = wanJiaJueSe.jingYan;
    }

}
//清除子弹爆炸效果
function clearBaoZha(){
    for(var i = 0 ; i<baoZhaArr.length;i++){
        playArea.removeChild(baoZhaArr[i].imgNode);
        baoZhaArr.splice(i,1);
        i--
    }
}
//子弹移动
function moveZiDan(){
    for(var i = 0;i<sheJiZiDanArr.length;i++){
        if(parseInt(sheJiZiDanArr[i].imgNode.style.left)<= 1600){
            sheJiZiDanArr[i].moveRight();
        }
        else{
            playArea.removeChild(sheJiZiDanArr[i].imgNode);
            sheJiZiDanArr.splice(i,1);
            i--;
        }
    }
}
//怪物移动
function moveGuai(){
    for(var i = 0;i < birdArr.length;i++){
        if((parseInt(birdArr[i].imgNode.style.left)< -50)){
            playArea.removeChild(birdArr[i].imgNode);
            birdArr.splice(i,1);
            i--;
        }
        else if(birdArr[i].isDead == false){
            birdArr[i].moveLeft();
        }
    }
    for(var j = 0;j < planeArr.length;j++){
        if(parseInt(planeArr[j].imgNode.style.left)< -50){
            playArea.removeChild(planeArr[j].imgNode);
            planeArr.splice(j,1);
            j--;
        }
        else if(planeArr[j].isDead == false){
            planeArr[j].moveLeft();
        }
    }
    for(var x = 0;x < ghostArr.length;x++){
        if(parseInt(ghostArr[x].imgNode.style.left)< -50){
            playArea.removeChild(ghostArr[x].imgNode);
            ghostArr.splice(x,1);
            x--;
        }
        else if(ghostArr[x].isDead == false) {
            ghostArr[x].moveLeft();
        }
    }
}
//射击
function sheji(){
    if(isGongji){
        wanJiaJueSe.shootZidan(wanJiaWuQiXiaoGuo[wanJiaJueSe.dengJi-1]);
    }
}
//判断玩家与宝箱碰撞
function wanJianAneBaoXiangPengZhuang(){
    var wanJiaLeft = parseInt(wanJiaJueSe.imgNode.style.left);
    var wanJiaTop = parseInt(wanJiaJueSe.imgNode.style.top);
    var wanJiaWidth = parseInt(wanJiaJueSe.imgNode.clientWidth);
    var wanJiaHeight = parseInt(wanJiaJueSe.imgNode.clientHeight);
    var suiJiBol =  Math.floor(Math.random()*800);
    for(var i = 0; i < baoXiangArr.length;i++){
        var baoXiangL = parseInt(baoXiangArr[i].imgNode.style.left);
        var baoXiangT = parseInt(baoXiangArr[i].imgNode.style.top);
        var baoXiangW = parseInt(baoXiangArr[i].imgNode.clientWidth);
        var baoXiangH = parseInt(baoXiangArr[i].imgNode.clientHeight);
        if((wanJiaLeft > baoXiangL - wanJiaWidth && wanJiaLeft < baoXiangL + baoXiangW)
            && (wanJiaTop > baoXiangT - wanJiaHeight && wanJiaTop < baoXiangT + baoXiangH)){
                playArea.removeChild(baoXiangArr[i].imgNode);
                baoXiangArr.splice(i,1);
                wanJiaJueSe.fengShu += 10;
                xianShiFengShu.innerHTML = wanJiaJueSe.fengShu;
                i--;
                if(suiJiBol > 600){
                    if(wanJiaJueSe.daJue < 7){
                        wanJiaJueSe.daJue++;
                    }
                    wanJiaJueSe.blood+=10;
                }
            }
    }
}
//添加键盘监听事件
function addKeyEvent() {
    //监听用户是否按下方向键
    document.onkeydown = function () {
        var e = window.event || arguments[0];
        if(e.keyCode == 37){
            isLeft = true;
        }
        else if(e.keyCode == 38){
            isUp = true;
        }
        else if(e.keyCode == 39){
            isRight = true;
        }
        else if(e.keyCode == 40){
            isDown = true;
        }
        else if(e.keyCode == 32){
            isGongji = true;
            wanJiaJueSe.imgNode.src = wanJiaGongJiDongZuo[wanJiaJueSe.dengJi-1];
        }
        else if(e.keyCode == 13){
            if(wanJiaJueSe.daJue > 0){
                createDaZhao();
                DaZhao.src = "mus/qiezi/da.mp3";
                DaZhao.play();
                wanJiaDaZhaoTime = setTimeout(clearDaZhao,3200);
                wanJiaJueSe.daJue--;
            }
        }
    };
    document.onkeyup = function () {
        var e = window.event || arguments[0];
        if(e.keyCode == 37){
            isLeft = false;
        }
        else if(e.keyCode == 38){
            isUp = false;
        }
        else if(e.keyCode == 39){
            isRight = false;
        }
        else if(e.keyCode == 40){
            isDown = false;
        }
        else if(e.keyCode == 32){
            isGongji = false;
            wanJiaJueSe.imgNode.src = wanJiaJueSeZhuangTai[wanJiaJueSe.dengJi-1];
        }
    };
}
//创建大招效果
function createDaZhao(){
    var DaZhao = new daoZhaoPrototype();
    daJueXiaoGuo.push(DaZhao);
    var suiJiBol =  Math.floor(Math.random()*800);
    for(var i = 0 ; i < birdArr.length;i++){
        var birdLeft = parseInt(birdArr[i].imgNode.style.left);
        var birdTop = parseInt(birdArr[i].imgNode.style.top);
        birdArr[i].blood -= 10;
        if(birdArr[i].blood <= 0 && birdArr[i].isDead == false){
            birdArr[i].imgNode.src = "img/enemy/bird/die.gif";
            birdArr[i].isDead = true;
            wanJiaJueSe.jingYan += 10;
            if(suiJiBol > 500){
                createBaoXiang(birdLeft,birdTop);
            }
        }
    }
    for(var x = 0 ;x <planeArr.length;x++){
        var planeLeft = parseInt(planeArr[x].imgNode.style.left);
        var planeTop = parseInt(planeArr[x].imgNode.style.top);
        planeArr[x].blood -= 10;
        if(planeArr[x].blood <= 0 && planeArr[x].isDead == false){
            planeArr[x].imgNode.src = "img/enemy/plane/die.gif";
            planeArr[x].isDead = true;
            wanJiaJueSe.jingYan += 10;
            if(suiJiBol > 500){
                createBaoXiang(planeLeft,planeTop);
            }
        }
    }
    for(var y = 0;y <ghostArr.length;y++){
        var ghostLeft = parseInt(ghostArr[y].imgNode.style.left);
        var ghostTop = parseInt(ghostArr[y].imgNode.style.top);
        ghostArr[y].blood -= 10;
        if(ghostArr[y].blood <= 0 && ghostArr[y].isDead == false){
            ghostArr[y].imgNode.src = "img/enemy/ghost/die.gif";
            ghostArr[y].isDead = true;
            wanJiaJueSe.jingYan += 10;
            if(suiJiBol > 500){
                createBaoXiang(ghostLeft,ghostTop);
            }
        }
    }
    if(Boss != undefined){
        Boss.blood -= 200;
        if(Boss.blood <= 0){
            Boss.imgNode.src = "img/enemy/boss/bossdie.gif"
            Boss.isDead = true;
            longShouJI.src = "mus/lbw/shouji.mp3";
            longShouJI.play();
            wanJiaJueSe.jingYan += 100;
        }
    }
    xianShiJingYan.innerHTML = wanJiaJueSe.jingYan;
}
//清除大招效果
function clearDaZhao(){
    for(var i = 0 ;i < daJueXiaoGuo.length;i++){
        playArea.removeChild(daJueXiaoGuo[i].imgNode);
        daJueXiaoGuo.splice(i,1);
    }
}
//玩家角色的操作判断
function moveWanJiaJueSe() {
    //判断用户是否按下方向键，是则调用移动方法
    if(isLeft){
        wanJiaJueSe.moveLeft()
    }
    if(isRight){
        wanJiaJueSe.moveRight()
    }
    if(isDown){
        wanJiaJueSe.moveDown()
    }
    if(isUp){
        wanJiaJueSe.moveUp()
    }
}
//添加BOSS炮弹爆炸效果
function addBossBaoZha(x,y){
    var x = x;
    var y = y;
    var bao = new baoZhaPrototype(x,y,"img/enemy/boss/attackHit.gif");
    baoZhaArr.push(bao);
}
//添加爆炸效果
function addBaoZha(x,y){
    var x = x;
    var y = y;
    var bao = new baoZhaPrototype(x,y,wanJiaBaoZhaArr[wanJiaJueSe.dengJi-1]);
    baoZhaArr.push(bao);
}
//创建玩家角色
function createWanJiaJueSe(){
    wanJiaJueSe = new WanJiaPrototype(360,384,wanJiaJueSeZhuangTai[0],15,99999999999999);
}
//创建鸟
function createBird(){
    var y = Math.floor(Math.random()*800);
    var index = Math.floor(Math.random()*(speedArr.length));
    var blood = Math.floor(Math.random()*6)+5;
    var bird = new guaiPrototype(1600,y,"img/enemy/bird/move.gif",speedArr[index],blood);
    birdArr.push(bird);
}
//创建飞机
function createPlane(){
    var y = Math.floor(Math.random()*800);
    var index = Math.floor(Math.random()*(speedArr.length));
    var blood = Math.floor(Math.random()*6)+5;
    var plane = new guaiPrototype(1600,y,"img/enemy/plane/move.gif",speedArr[index],blood);
    planeArr.push(plane);
}
//创建幽灵
function createGhost(){
    var y = Math.floor(Math.random()*800);
    var index = Math.floor(Math.random()*(speedArr.length));
    var blood = Math.floor(Math.random()*6)+5;
    var ghost = new guaiPrototype(1600,y,"img/enemy/ghost/move.gif",speedArr[index],blood);
    ghostArr.push(ghost);
}
//创建宝箱
function createBaoXiang(x,y){
    var x = x;
    var y = y;
    var baoXiang = new baoXiangPrototype(x,y);
    baoXiangArr.push(baoXiang)
}
//创建BOSS
function createBoss(){
    Boss = new bossPrototype();
}
//创建玩家原型
function WanJiaPrototype(x,y,imgsrc,speed,blood){
    this.x = x;
    this.y = y;
    this.imgSrc = imgsrc;
    this.imgNode = document.createElement("img");
    this.speed = speed;
    this.blood = blood;
    this.dengJi = 1;
    this.fengShu = 0;
    this.jingYan = 0;
    this.daJue = 3;
    //下移方法
    this.moveDown = function(){
        var top = parseInt(this.imgNode.style.top);
        if(top <= playArea.clientHeight - 54){
            this.imgNode.style.top = top + this.speed +"px";
        }
    };
    //上移方法
    this.moveUp = function(){
        var top = parseInt(this.imgNode.style.top);
        if(top >= 0){
            this.imgNode.style.top = top - this.speed +"px";
        }
    };
    //左移方法
    this.moveLeft = function(){
        var left = parseInt(this.imgNode.style.left);
        if(left >= 0){
            this.imgNode.style.left =  left - this.speed + "px"
        }
    };
    //右移方法
    this.moveRight = function(){
        var left = parseInt(this.imgNode.style.left);
        if(left <= 1482){
            this.imgNode.style.left =  left + this.speed + "px"
        }
    };
    //射击方法
    this.shootZidan = function (img) {
        caozuo.src = "mus/qiezi/AK.mp3";
        caozuo.play();
        var x = parseInt(wanJiaJueSe.imgNode.style.left) + 90;
        var y = parseInt(wanJiaJueSe.imgNode.style.top) + 50;
        var img = img;
        var zidan = new ZiDanPrototye(x,y,img,50)
        sheJiZiDanArr.push(zidan);
    };
      //组装
      this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = x + "px";
        this.imgNode.style.top = y +"px";
        playArea.appendChild(this.imgNode);
    };
    this.init();
}
//创建子弹原型
function ZiDanPrototye(x,y,imgsrc,speed){
    this.x = x;
    this.y = y;
    this.imgSrc = imgsrc;
    this.imgNode = document.createElement("img");
    this.speed = speed;
    //子弹向右发射
    this.moveRight = function(){
        var left = parseInt(this.imgNode.style.left);
        this.imgNode.style.left = left + this.speed +"px";
    };
    //组装
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = this.x + "px";
        this.imgNode.style.top = this.y +"px";
        playArea.appendChild(this.imgNode);
    };
    this.init();
}
//创建敌人原型
function guaiPrototype(x,y,imgsrc,speed,blood){
    this.x = x;
    this.y = y;
    this.imgSrc = imgsrc;
    this.imgNode = document.createElement("img");
    this.speed = speed;
    this.blood = blood;
    this.isDead = false;
    this.moveLeft = function (){
        var left = parseInt(this.imgNode.style.left) - this.speed;
        this.imgNode.style.left = left + "px"
    };
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = "1600px";
        this.imgNode.style.top = y +"px";
        playArea.appendChild(this.imgNode);
    };
    this.init()
}
//创建爆炸效果原型
function baoZhaPrototype(x,y,imgsrc){
    this.x = x;
    this.y = y;
    this.imgSrc = imgsrc;
    this.imgNode = document.createElement("img");
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = x +"px";
        this.imgNode.style.top = y +"px";
        playArea.appendChild(this.imgNode);
    };
    this.init()
}
//创建宝箱效果原型
function baoXiangPrototype(x,y){
    this.x = x;
    this.y = y;
    this.imgSrc = "img/enemy/thing.gif";
    this.imgNode = document.createElement("img");
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = x +"px";
        this.imgNode.style.top = y +"px";
        playArea.appendChild(this.imgNode);
    };
    this.init()
}
//创建大招原型
function daoZhaoPrototype(){
    this.imgSrc = "img/skill.gif";
    this.imgNode = document.createElement("img");
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = "168px";
        this.imgNode.style.top = "133px";
        playArea.appendChild(this.imgNode);
    };
    this.init()
}
//创建BOSS原型
function bossPrototype(){
    this.imgSrc = "img/enemy/boss/move.gif";
    this.speed = 5;
    this.blood = 500;
    this.isDead = false;
    this.imgNode = document.createElement("img");
    this.moveLeft = function(){
        var left = parseInt(this.imgNode.style.left) - this.speed;
        if(left > 1200){
            this.imgNode.style.left = left + "px";
        }
    };
    this.moveUp = function(){
        var top = parseInt(this.imgNode.style.top) - this.speed;
        if(top > 0){
            this.imgNode.style.top = top + "px";
        }
    };
    this.moveDown = function(){
        var top = parseInt(this.imgNode.style.top) + this.speed;
        if(top < 740){
            this.imgNode.style.top = top + "px";
        }
    };
    this.shootYouYu = function(){
        BossChuJi.src = "mus/qiezi/AWP.mp3";
        BossChuJi.play();
        var x = parseInt(Boss.imgNode.style.left) + 90;
        var y = parseInt(Boss.imgNode.style.top) + 50;
        var img = "img/enemy/boss/attackBall.gif";
        var paodan = new bossPaoPrototype(x,y,img,50)
        BossPaoArr.push(paodan);
    };
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = "1600px";
        this.imgNode.style.top = "400px";
        playArea.appendChild(this.imgNode);
    };
    this.init();
}
//创建BOSS炮弹原型
function bossPaoPrototype(x,y,imgsrc,speed){
    this.x = x;
    this.y = y;
    this.imgSrc = imgsrc;
    this.imgNode = document.createElement("img");
    this.speed = speed;
    this.moveLeft = function(){
        var left = parseInt(this.imgNode.style.left) - this.speed;
        this.imgNode.style.left = left + "px";
    };
    //组装
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.left = this.x + "px";
        this.imgNode.style.top = this.y +"px";
        playArea.appendChild(this.imgNode);
    };
    this.init();
}
//玩家技能图标显示
function jiNengImg(){
    if(wanJiaJueSe.daJue < 8){
        JiNengXianShi.src ="img/ui/boom/boom"+wanJiaJueSe.daJue+".png";
    }
}