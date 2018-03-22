let vm=new Vue({
    el:'#container',
    data:{
        chessRowsCols:11,//棋盘行列
        chessmanNum:121,//棋子总数 行*列
        chessmanColor:true,//棋子颜色
        chessWhite:[],//白棋棋子
        chessBlack:[],//黑棋棋子
        chessPath:[],//棋子路径
        chessNums:1,//棋子数
        isShow:false,//判断胜负后不可继续落子
        restart:true//重新开始棋局
    },
    methods:{
        chess(e){
            if (e.target.getAttribute('isChess')=='true'){//是否有棋子
                e.target.innerHTML='<span>'+(this.chessNums++)+'</span>';//棋子索引
                this.chessmanColor=!this.chessmanColor;
                e.target.setAttribute('isChess','false');
                this.chessPath.push(e.target.getAttribute('index')-0);
                if (this.chessmanColor) {//白子
                    this.chessWhite.push(e.target.getAttribute('index')-0);
                    e.target.children[0].style.backgroundColor='#fff';
                    e.target.children[0].style.color='#000';
                }else {//黑子
                    this.chessBlack.push(e.target.getAttribute('index')-0);
                }
                this.arrSort(this.chessWhite);//排序棋子数组
                this.arrSort(this.chessBlack);
                if (this.chessmanColor) {//白子
                    this.isWin(this.chessWhite,'白子赢！');
                }else {//黑子
                    this.isWin(this.chessBlack,'黑子赢！');
                }
            }
        },
        withdraw(){//悔棋
            if (this.chessPath.length) {//判断是否有棋子
                const chessNum=this.chessPath.pop();//获取最后一次落子
                const oUl=window.document.getElementById('board');
                oUl.children[chessNum-1].innerHTML='';//清除棋子
                oUl.children[chessNum-1].setAttribute('isChess','true');//修改为可以落子
                this.chessNums--;//棋子总数更新
                if (this.chessmanColor) {//白子
                    const index=this.chessWhite.indexOf(chessNum);//获取棋子数组索引
                    if (index>-1) {
                        this.chessWhite.splice(index,1);//从棋子数组中删除
                    }
                }else {//黑子
                    const index=this.chessBlack.indexOf(chessNum);
                    if (index>-1) {
                        this.chessBlack.splice(index,1);
                    }
                }
                this.chessmanColor=!this.chessmanColor;//黑白棋子切换
                if (this.isShow) {//不可落子状态改为可以
                    this.isShow=false;
                }
            }
        },
        isWin(arr,mes){//胜利判断函数
            if (arr.length>=5) {
                for (let i=0;i<arr.length;i++) {
                    if ((arr[i+4]-arr[i]==4) && ((arr[i]+arr[i+1]+arr[i+2]+arr[i+3]+arr[i+4])/5==arr[i+2])) {//横向
                        alert(mes);
                        this.isShow=true;
                        break;
                    }
                    let S=R=L=1;
                    for (let j=i+1;j<arr.length;j++) {
                        if (arr[j]-arr[i]==S*this.chessRowsCols) {//纵向
                            S++;
                            if (S==5) {
                                alert(mes);
                                this.isShow=true;
                                break;
                            }
                        }
                        if (arr[j]-arr[i]==R*(this.chessRowsCols+1)) {//右斜
                            R++;
                            if (R==5) {
                                alert(mes);
                                this.isShow=true;
                                break;
                            }
                        }
                        if (arr[j]-arr[i]==L*(this.chessRowsCols-1)) {//右斜
                            L++;
                            if (L==5) {
                                alert(mes);
                                this.isShow=true;
                                break;
                            }
                        }
                    }

                }
            }
        },
        arrSort(arr){//数组排序
            for(let i=arr.length;i>0;i--) {
                if (arr[i]<arr[i-1]) {
                    let temp=arr[i];
                    arr[i]=arr[i-1];
                    arr[i-1]=temp;
                }
            }
        },
        restartChess(){//初始化
            this.isShow=false;
            this.chessmanColor=true;
            this.chessWhite=[];
            this.chessBlack=[];
            this.chessPath=[];
            this.chessNums=1;
            this.restart=false;
            this.$nextTick(function () {
                this.restart=true;
            });
        }
    }
});