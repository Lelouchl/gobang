let vm=new Vue({
    el:'#container',
    data:{
        chessRowsCols:11,//棋盘行列
        chessmanNum:121,
        chessmanColor:true,//棋子颜色
        chessWhite:[],//白棋棋子
        chessBlack:[],//黑棋棋子
        isShow:false,
        restart:true
    },
    methods:{
        chess(e){
            console.log(typeof (this.chessWhite),this.chessBlack);
            if (e.target.getAttribute('isChess')=='true'){//是否有棋子
                e.target.innerHTML='<span></span>';
                this.chessmanColor=!this.chessmanColor;
                e.target.setAttribute('isChess','false');
                if (this.chessmanColor) {//白子
                    this.chessWhite.push(e.target.getAttribute('index')-0);
                    e.target.children[0].style.backgroundColor='#fff';
                }else {//黑子
                    this.chessBlack.push(e.target.getAttribute('index')-0);
                }
                this.arrSort(this.chessWhite);
                this.arrSort(this.chessBlack);
                if (this.chessmanColor) {//白子
                    this.isWin(this.chessWhite,'白子赢！');
                }else {//黑子
                    this.isWin(this.chessBlack,'黑子赢！');
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
        restartChess(){//重新开始
            this.isShow=false;
            this.chessmanColor=true;
            this.chessWhite=[];
            this.chessBlack=[];
            this.restart=false;
            this.$nextTick(function () {
                this.restart=true;
            });
        }
    }
});