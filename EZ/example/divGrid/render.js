var columns = function(){
				var cols = {
					index : {cls:'time'
							,text:EZ.lang('時間')
							,dataIndex:'timestamp'
							,width:20
							,renderer:function(value, p , record , rowIndex, columnIndex){
								return rowIndex;
							}
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					}
					,time : {cls:'time'
							,text:EZ.lang('時間')
							,dataIndex:'timestamp'
							,width:60,renderer:Time
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},team : {cls:'team'
							,text:EZ.lang('主客隊伍')
							,dataIndex:'team_h'
							,width:170
							,renderer:Team
							,updateField:['team_h','team_c']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},R : {cls:'R'
						,text:(opt.gtype=='FT' && opt.rtype=='R') ? (EZ.lang("全場")+EZ.lang("讓球")) : EZ.lang("讓球")
						,dataIndex:'k'
						,width:76
						,renderer:R
						,updateField:['l','m','k']
						,resizable:true
						,draggable:true
						,sortable:true
						,hidden:false
					},F_R : {cls:'R'
							,text:(opt.gtype=='FT' && opt.rtype=='R') ? (EZ.lang("全場")+EZ.lang("讓球")) : EZ.lang("讓球")
							,dataIndex:'k'
							,width:76
							,renderer:R
							,updateField:['l','m','k']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},HR_R : {cls:'HR_R'
							,text:EZ.lang("上半")+EZ.lang("讓球")
							,dataIndex:'m2'
							,width:75
							,renderer:HR_R
							,updateField:['j','m2','m3','m4']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},OU : {cls:'OU'
							,text:(opt.gtype=='FT' && opt.rtype=='HR') ? (EZ.lang("全場")+EZ.lang("大小")) : EZ.lang("大小盤")
							,dataIndex:'n'
							,width:80
							,renderer:OU
							,updateField:['o','p','j']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},F_OU : {cls:'OU'
							,text:(opt.gtype=='FT' && opt.rtype=='HR') ? (EZ.lang("全場")+EZ.lang("大小")) : EZ.lang("大小盤")
							,dataIndex:'n'
							,width:80
							,renderer:OU
							,updateField:['o','p','j']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},HR_OU : {cls:'HR_OU'
							,text:EZ.lang("上半")+EZ.lang("大小")
							,dataIndex:'m5'
							,width:80
							,renderer:HR_OU
							,updateField:['m5','m6','m7']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},EO : {cls:'EO'
							,text:EZ.lang("單雙")
							,dataIndex:'q'
							,width:80
							,renderer:EO
							,resizable:true
							,updateField:['q','r']
							,draggable:true
							,sortable:true
							,hidden:false
					},M : {cls:'M'
						,text: (opt.gtype=='FT' && opt.rtype=='M') ? EZ.lang("全場")+"1X2" : EZ.lang("獨贏")
						,dataIndex:'u'
						,width:70
						,renderer:M
						,updateField:['u','v','w']
						,resizable:true
						,draggable:true
						,sortable:true
						,hidden:false
					},F_M : {cls:'M'
							,text: (opt.gtype=='FT' && opt.rtype=='M') ? EZ.lang("全場")+"1X2" : EZ.lang("獨贏")
							,dataIndex:'u'
							,width:70
							,renderer:M
							,updateField:['u','v','w']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},HR_M : {cls:'HR_M'
							,text: EZ.lang("上半")+"1X2"
							,dataIndex:'m10'
							,width:70
							,renderer:HR_M
							,updateField:['m10','m11','m12']
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},live : {cls:'live'
							,text: EZ.lang("直播")
							,dataIndex:'a4'
							,width:50
							,renderer:live
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},league : {cls:'league'
							,text: EZ.lang("聯盟")
							,dataIndex:'e'
							,width:70
							,renderer:league
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:true
					},'R2' : {cls:'R2'
							,text: EZ.lang("一輸二贏")
							,dataIndex:'e'
							,width:70
							,renderer:R2
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},'FG' : {cls:'FG'
							,text: EZ.lang("先得分")
							,dataIndex:'s'
							,width:70
							,renderer:FG
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},'score' : {cls:'score'
							,text: EZ.lang("比數")
							,dataIndex:'v'
							,width:70
							,renderer:score
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},ps : {cls:'ps'
							,text:EZ.lang("備註") 
							,dataIndex:'y'
							,width:50
							,renderer:ps
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},'gid' : {cls:'gid'
							,text: EZ.lang("gid")
							,dataIndex:'b'
							,width:80
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:true
					},CMH : {cls:'CMH'
							,text: ""
							,dataIndex:'k'
							,width:80
							,renderer:CMH
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},CMN : {cls:'CMN'
							,text: EZ.lang("和局")
							,dataIndex:'k'
							,width:80
							,renderer:CMN
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},CMC : {cls:'CMC'
							,text: ""
							,dataIndex:'k'
							,width:80
							,renderer:CMC
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					},teamH : {cls:'teamH'
							,text:EZ.lang("弱隊")
							,dataIndex:'k'
							,width:80
							,renderer:teamH
							,resizable:true
							,draggable:true
							,sortable:true
							,hidden:false
					}
				};
				var playmode=getplaymode();
				
				var result=[];
				for(var i=0;i<playmode.length;i++)
				{
					var p = playmode[i];
					var tmp = cols[p];
					if(typeof tmp == 'undefined'){
						EZ.log('a : '+p+' = '+tmp);
					}
					result[i]=cols[p];
				}
				return result;
			}
			,getplaymode = function(){
				switch(opt.gtype)
				{
					case "FT": var playmode=['gid','league','time','team','F_R','F_OU','F_M','HR_R','HR_OU','HR_M','ps'];break;
					case "EF": var playmode=['gid','league','time','team','R','OU','EO','M','live'];break;
					case "EK":
					case "WB":
					case "BK": var playmode=['gid','league','time','team','R','OU','EO','M','FG','live'];break;
					case "EB":
					case "JB":
					case "BS": var playmode=['gid','league','time','team','R','OU','M','R2','live'];break;
					case "KB":
					case "CB": var playmode=['gid','league','time','team','R','OU','live'];break;
					case "AF": var playmode=['gid','league','time','team','R','OU','EO','M','live'];break;
					case "IB": var playmode=['gid','league','time','team','R','OU','EO','M','live'];break;
					case "LO": var playmode=['gid','league','time','team','OU','EO','live'];break;
					case "ST": var playmode=['gid','league','time','team','OU','EO','live'];break;
					default: var playmode=['gid','league','time','team','R','OU','EO','M','live'];break;
				}
				switch(opt.gtype+"_"+opt.rtype)
				{
					case "FT_PM": var playmode=['gid','league','time','teamC','CMH','CMN','CMC','teamH'];break;
					case "EF_MPR":
					case "FT_MPR": var playmode=['gid','league','time','team','R','OU','EO','M'];break;
					case "EK_MPR":
					case "WB_MPR":
					case "BK_MPR": var playmode=['gid','league','time','team','R','OU','EO','M'];break;
					case "EB_MPR":
					case "JB_MPR":
					case "BS_MPR": var playmode=['gid','league','time','team','R','OU','M','R2'];break;
					case "KB_MPR":
					case "CB_MPR": var playmode=['gid','league','time','team','R','OU'];break;
					case "AF_MPR": var playmode=['gid','league','time','team','R','OU','EO','M'];break;
					case "IB_MPR": var playmode=['gid','league','time','team','R','OU','EO','M'];break;
					case "LO_MPR": var playmode=['gid','league','time','team','OU','EO'];break;
					case "ST_MPR": var playmode=['gid','league','time','team','OU','EO'];break;
					case "EF_RE":
					case "FT_RE": var playmode=['gid','league','time','team','score','R','OU','live'];break;
					case "EK_RE":
					case "WB_RE":
					case "BK_RE": var playmode=['gid','league','time','team','R','OU','EO','live'];break;
					case "EK_HR":
					case "WB_HR":
					case "BK_HR": var playmode=['gid','league','time','team','R','OU','EO','M','live'];break;
					case "EK_R":
					case "WB_R":
					case "BK_R": var playmode=['gid','league','time','team','R','OU','EO','M','FG','live'];break;
					case "EB_RE":
					case "JB_RE":
					case "BS_RE": var playmode=['gid','league','time','team','R','OU','live'];break;
					case "AF_RE": var playmode=['gid','league','time','team','R','OU','EO','live'];break;
					case "IB_RE": var playmode=['gid','league','time','team','R','OU','EO','live'];break;
					case "EF_PR":
					case "FT_PR": var playmode=['gid','league','time','team','R','OU'];break;
					case "EK_PR":
					case "WB_PR":
					case "BK_PR": var playmode=['gid','league','time','team','R','OU'];break;
					case "EB_PR":
					case "JB_PR":
					case "BS_PR": var playmode=['gid','league','time','team','R','OU'];break;
					case "KB_PR":
					case "CB_PR": var playmode=['gid','league','time','team','R','OU'];break;
					case "AF_PR": var playmode=['gid','league','time','team','R','OU'];break;
					case "IB_PR": var playmode=['gid','league','time','team','R','OU'];break;
					case "BS_SPR": var playmode=['gid','league','time','team','M','R2'];break;
					default: break;
				}
				return playmode;
			}
			,checknull = function(text){
				return (typeof text != 'undefined' && text !=null) ? text : '';
			}
			//小table
			,smallTable = function(ds){
				var tb = [];
				for(var i=0;i<ds.length;i++)
				{
					var d = ds[i];
					tb[tb.length] = "<div class='css"+i+"'>"+d+"</div>";
				}
				return tb.join('');
			}
			// drawer ----------------------------------------------------
			,Time = function(value, p , record , rowIndex, columnIndex){
				//在單式 跟 半場   midfield = D  要show 走地
				
				switch(opt.rtype)
				{
					case "R":
					case "HR":
						//if(record.data.a3!='D')	var showre="<br><img src=\"images/showre.gif\" border=\"0\" complete=\"complete\">";
						if(record.data.a3!='D')	var showre="<span class='showre'></span>";
						else var showre='';
						
						break;
					
					default:
						var showre='';
						break;
				}
				var cell = [];
				if(opt.gtype=="RE")
				{
					if(record.data.gtype=="BS"||record.data.gtype=="JB"||record.data.gtype=="CB"||record.data.gtype=="KB"||record.data.gtype=="FT"||record.data.gtype=="EF"){
						cell[cell.length] = "<font style='color:red;'>"+record.data.scoH+" - "+record.data.scoC+"</font>";
						cell[cell.length] = showre;
					}else{
						cell[cell.length] = record.data.c;
						cell[cell.length] = record.data.d;
						cell[cell.length] = showre;
					}
				}
				else
				{
					if(record.data.runball == "Y"&&(opt.gtype=="BS"||opt.gtype=="CB"||opt.gtype=="KB"||opt.gtype=="JB"||opt.gtype=="FT"||opt.gtype=="EF")){
						cell[cell.length] = "<font style='color:red;'>"+record.data.scoH+" - "+record.data.scoC+"</font>";
						cell[cell.length] = showre;
					}else{
						cell[cell.length] = record.data.c;
						cell[cell.length] = record.data.d;
						cell[cell.length] = showre;
					}
				}
				var thisCell = '';
				switch(opt.gtype+"_"+opt.rtype)
				{
					case "FT_PM":
					case "FT_PR":
							thisCell="<span class=\"celltimePM\">"+record.data.d+"</span>"+showre+"";
							var gameid="<input id=\"game_id"+(rowIndex+1)+"\" name=\"game_id"+(rowIndex+1)+"\" type=\"radio\" value=\""+record.data.h+"&"+record.data.b+",\" style=\"display:none\">";
							thisCell=thisCell+gameid;
							break;
					case "FT_MPR":
					case "EF_MPR":
					case "BK_MPR":
					case "WB_MPR":
					case "EK_MPR":
					case "BS_MPR":
					case "EB_MPR":
					case "CB_MPR":
					case "JB_MPR":
					case "KB_MPR":
					case "AF_MPR":
					case "IB_MPR":
					case "BS_SPR":
						var gameid="<input id=\"game_id"+(rowIndex+1)+"\" name=\"game_id"+(rowIndex+1)+"\" type=\"radio\" value=\""+record.data.h+"&"+record.data.b+",\" style=\"display:none\">";
						thisCell=thisCell+gameid;
						break;
					case "BK_HR":
							if(record.data.a2!="73" && record.data.a2!="74")
							{
								if(record.data.a2=="76")	thisCell="<font class=\"ior\">第1節</font>";
								else if(record.data.a2=="77")	thisCell="<font class=\"ior\">第2節</font>";
								else if(record.data.a2=="78")	thisCell="<font class=\"ior\">第3節</font>";
								else if(record.data.a2=="79")	thisCell="<font class=\"ior\">第4節</font>";
							}
						break;
					default:
						break;
				}
				
				return smallTable(cell);
			}
			,Team = function(value, p , record, rowIndex, columnIndex){
				var cell = [];
				var place='';
				var place = '主';
				var bgame1='';
				var bgame2='';
				if(record.data.b0 == 'M')
				{
					place = '中';
				}
				else if(record.data.b0 == 'B')
				{
					bgame1=' --';
					bgame2='補賽';
				}
				switch(opt.gtype)
				{
					case "EF":
					case "FT":	
							var cellH = "<font color='mediumblue'>"+record.data.team_h+"</font><font color='red'>["+EZ.lang(place)+"]</font>";
							var cellC = ""+record.data.team_c+"<font color='mediumblue'>"+bgame1+EZ.lang(bgame2)+"</font>";
							var cellN = ""+EZ.lang('和')+" <font style='color:#fff;'>"+record.data.e+' '+record.data.b+" </font>";
							cell = [
								cellH
								,cellC
								,cellN
							]
						break;
					case "BS":
					case "EB":
					case "KB":
					case "JB":
					case "CB":
							var hand=new Array();
							hand['L']='左';hand['R']='右';
							
							//var pitcher_c=top.pn[record.data.a8];
							//var pitcher_h=top.pn[record.data.a9];
							//var hand_c='('+hand[top.pmode[record.data.a8]]+')';
							//var hand_h='('+hand[top.pmode[record.data.a9]]+')';
							var pitcher_c=checknull(record.data.pitcher_c);
							var pitcher_h=checknull(record.data.pitcher_h);
							
							var hand_c='';
							var hand_h='';
							if(!hand[record.data.hand_c]) hand_c='';
							else hand_c='('+hand[record.data.hand_c]+')';
							
							if(!hand[record.data.hand_h]) hand_h='';
							else hand_h='('+hand[record.data.hand_h]+')';
							cell = [
								record.data.team_c +"<font color='#999999'>"+pitcher_c +hand_c +"</font> <font color='mediumblue'>"+bgame1 +EZ.lang(bgame2) +"</font>"
								,"<font color='mediumblue'>"+record.data.team_h+"</font><font color='#999999'>"+pitcher_h +hand_h+"</font><font color='red'>["+ EZ.lang(place) +"]</font>"
							]
							
						break;
					case "LO":
							cell = ["<font color='mediumblue'>"+record.data.team_h+"</font>"];
						break;
					case "ST":
							cell = ["<font color='mediumblue'>"+record.data.team_h+"</font>"];
						break;
					case "RE":
						if(record.data.gtype=="FT" || record.data.gtype=="EF"){
							cell = [
								"<font color='mediumblue'>"+record.data.team_h+"</font><font color='red'>["+ EZ.lang(place) +"]</font>"
								,record.data.team_c +"<font color='mediumblue'>"+bgame1+ EZ.lang(bgame2)+"</font>"
							]
						}else{
							cell = [
								record.data.team_c +"<font color='mediumblue'>"+bgame1+ EZ.lang(bgame2)+"</font>"
								,"<font color='mediumblue'>"+record.data.team_h+"</font><font color='red'>["+ EZ.lang(place) +"]</font>"
							]
						}
				break
					default:
						cell = [
							record.data.team_c +"<font color='mediumblue'>"+bgame1+ EZ.lang(bgame2)+"</font>"
							,"<font color='mediumblue'>"+record.data.team_h+"</font><font color='red'>["+ EZ.lang(place) +"]</font>"
						]
						break;
				}
				return smallTable(cell);
			}
			
			,teamC = function(value, p , record, rowIndex, columnIndex){
				//FT的標準過關會用到 
				var thisCell='';
				if(record.data.j=="C")
				{
					thisCell= "<span class=\"cellteamPM\"><font color='mediumblue'>"+record.data.team_h+"</font><font color='red'>["+ EZ.lang('主')+"]</font></span>";
				}
				else
				{
					thisCell= "<span class=\"cellteamPM\">"+record.data.team_c+"</span>";
				}
				
				return thisCell;
			}
			
			,teamH = function(value, p , record, rowIndex, columnIndex){
				//FT的標準過關會用到
				var thisCell='';
				if(record.data.j=="H")
				{
					thisCell= "<span class=\"cellteamPM\"><font color='mediumblue'>"+record.data.team_h+"</font><font color='red'>["+ EZ.lang('主')+"]</font></span>";
				}
				else
				{
					thisCell= "<span class=\"cellteamPM\">"+record.data.team_c+"</span>";
				}
				
				return thisCell;
			}
			
			,R = function(value, p , record, rowIndex, columnIndex){
				if(record.data.l==0 || record.data.m==0)	return "<div>&nbsp;</div>";
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype=(opt.rtype=='RE')?'RE':'R'
				,gid = record.data.b
				,strong = record.data.j
				,con_H
				,con_C;
				if(record.data.j=='H')
				{
					con_H=record.data.k;
					con_C='&nbsp;';
				}
				else	
				{
					con_C=record.data.k;
					con_H='&nbsp;';
				}
				
				var cell = [];
				if(rtype == "R" || rtype=="RE")
				{
					switch(gtype)
					{
						case "FT":
						case "EF":
							cell = [
								con_H
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' >"+record.data.l+"</a>"
								,con_C
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' >"+record.data.m+"</a>"
							];
						break;
						case "RE"://走地專區
							if(gtype=='FT' || gtype=='EF'){
								cell = [
									con_H
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' >"+record.data.l+"</a>"
									,con_C
									,"<a usefor='doOrder' key='"+key+"'gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' >"+record.data.m+"</a>"
								];
							}else{
								cell = [
									con_C
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m+"</a>"
									,con_H
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.l+"</a>"
								];
							}
							break;
						default:
							cell = [
								con_C
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m+"</a>"
								,con_H
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.l+"</a>"
							];
							break;
					}
				}
				else if(rtype == "MPR")
				{
					switch(gtype)
					{
						case "FT":
						case "EF": 
								cell = [
									con_H
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.l+"</a>"
									,con_C
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m+"</a>"
								];
							break;
						default: 
								cell = [
									con_C
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m+"</a>"
									,con_H
									,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.l+"</a>"
								];
							break;
					}
				}
				return smallTable(cell);
			}
			,HR_R = function(value, p , record, rowIndex, columnIndex){
				if(record.data.m3==0 || record.data.m4==0 || record.data.m1=='N')	return "<div>&nbsp;</div>";
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype=(opt.rtype=='RE')?'HRE':'HR'
				,gid = record.data.m0
				,strong = record.data.j
				,con_H
				,con_C;
				if(record.data.j=='H')
				{
					con_H=record.data.m2;
					con_C='&nbsp;';
				}
				else	
				{
					con_C=record.data.m2;
					con_H='&nbsp;';
				}
				var cell = [];
				switch(gtype)
				{
					case "FT":
					case "EF":
							cell = [
								con_H
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' >"+record.data.m3+"</a>"
								,con_C
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' >"+record.data.m4+"</a>"
							];
						break;
					default:
							cell = [
								con_C
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' >"+record.data.m4+"</a>"
								,con_H
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' >"+record.data.m3+"</a>"
							];
						break;
				}
				return smallTable(cell);
			}
			,OU = function(value, p , record, rowIndex, columnIndex){
				if(record.data.o==0 || record.data.p==0) return "<div>&nbsp;</div>";
				
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype=(opt.rtype=='RE')?'ROU':'OU'
				,gid = record.data.b
				,strong = record.data.j;
				var cell = [
							record.data.n
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.o+"</a>"
							,'小'
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.p+"</a>"
						];
				return smallTable(cell);
			}
			,HR_OU = function(value, p , record, rowIndex, columnIndex){
				if(record.data.m6==0 || record.data.m7==0 || record.data.m1=='N')	return "<div>&nbsp;</div>";
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype=(opt.rtype=='RE')?'HROU':'HOU'
				,gid = record.data.m0
				,strong = record.data.j;
				var cell = [
							record.data.m5
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.m6+"</a>"
							,'小'
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m7+"</a>"
						];
				return smallTable(cell);
			}
			,EO = function(value, p , record, rowIndex, columnIndex){
				if(record.data.q==0 || record.data.r==0) return "<div>&nbsp;</div>";
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype=(opt.rtype=='RE')?'REO':'EO'
				,gid = record.data.b
				,strong = record.data.j;
				var cell = [
					EZ.lang("單")
					,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' ioratio='"+record.data.q+"'>"+record.data.q+"</a>"
					,EZ.lang("雙")
					,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' ioratio='"+record.data.r+"'>"+record.data.r+"</a>"
				];
				return smallTable(cell);
			}
			,M = function(value, p , record, rowIndex, columnIndex){
				if(record.data.u == 0 || record.data.v== 0) return "<div>&nbsp;</div>";
				if(record.data.w == 0) record.data.w='';
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype='M'
				,gid = record.data.b
				,strong = record.data.j
				
				var cell = [];
				switch(gtype)
				{
					case "EF":
					case "FT":
							cell =[
								"&nbsp;"
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' ioratio='"+record.data.u+"'>"+record.data.u+"</a>"
								,"&nbsp;"
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' ioratio='"+record.data.v+"'>"+record.data.v+"</a>"
								,EZ.lang('和')
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='N' gid='"+gid+"' ioratio='"+record.data.w+"'>"+record.data.w+"</a>"
							];
						break;
					default:
						cell =[
							"&nbsp;"
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"' ioratio='"+record.data.v+"'>"+record.data.v+"</a>"
							,"&nbsp;"
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"' ioratio='"+record.data.u+"'>"+record.data.u+"</a>"
						];
					break;
				}
				return smallTable(cell);
			}
			
			,HR_M = function(value, p , record, rowIndex, columnIndex){
				if(record.data.m10 == 0 || record.data.m11== 0 || record.data.m1=='N') return ''
				var RE='';
				if(opt.rtype=="RE" || record.data.runball=="Y") RE='1';
				if(record.data.m12 == 0) record.data.m12='';
				//取得 key gtype rtype wtype gid strong  ,  con_H con_C
				var key = record.data.b
				,gtype = record.data.gtype
				,rtype = opt.rtype
				,wtype='HM'
				,gid = record.data.m0
				,strong = record.data.j;
				
				var cell = [];
				switch(gtype)
				{
					case "EF":
					case "FT":
							cell =[
								"&nbsp;"
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.m10+"</a>"
								,"&nbsp;"
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m11+"</a>"
								,EZ.lang('和')
								,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='N' gid='"+gid+"'>"+record.data.m12+"</a>"
							];
						break;
					default:
						cell =[
							"&nbsp;"
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='C' gid='"+gid+"'>"+record.data.m11+"</a>"
							,"&nbsp;"
							,"<a usefor='doOrder' key='"+key+"' gtype='"+gtype+"' rtype='"+rtype+"' wtype='"+wtype+"' type='H' gid='"+gid+"'>"+record.data.m10+"</a>"
						];
					break;
				}
				return smallTable(cell);
				/*
				var thisCell='';
				switch(opt.gtype)
				{
					case "EF":
					case "FT":
							var spanH = "<span class=\"cellM0\">&nbsp;</span>";
							var hrefH = "<a href=\"#\" class=\"cellM1 ior\"  onclick=\"return doOrder('"+opt.gtype+"',"+record.data.m0+",'M','H','"+record.data.m10+"','"+RE+"')\">"+record.data.m10+"</a>";
							var spanC = "<span class=\"cellM0\">&nbsp;</span>";
							var hrefC = "<a href=\"#\"  class=\"cellM1 ior\" onclick=\"return doOrder('"+opt.gtype+"',"+record.data.m0+",'M','C','"+record.data.m11+"','"+RE+"')\">"+record.data.m11+"</a>";
							var spanN = "<span class=\"cellM0\">"+EZ.lang('和')+"</span>";
							var hrefN = "<a href=\"#\"  class=\"cellM1 ior\"  onclick=\"return doOrder('"+opt.gtype+"',"+record.data.m0+",'M','N','"+record.data.m12+"','"+RE+"')\">"+record.data.m12+"</a>";
							thisCell = spanH+hrefH+"<br>"+spanC+hrefC+"<br>"+spanN+hrefN+"<br>"
						break;
					default:
							thisCell="<span class=\"cellM0\">&nbsp;</span><a href=\"#\" class=\"cellM1 ior\" onclick=\"return doOrder('"+opt.gtype+"',"+record.data.m0+",'M','C','"+record.data.m11+"','"+RE+"')\">"+record.data.m11+"</a><br><span class=\"cellM0\">&nbsp;</span><a href=\"#\"  class=\"cellM1 ior\"  onclick=\"return doOrder('"+opt.gtype+"',"+record.data.m0+",'M','H','"+record.data.m10+"','"+RE+"')\">"+record.data.m10+"</a>";
						break;
				}
				
				return thisCell;
				*/
			}
			
			,CMH = function(value, p , record, rowIndex, columnIndex){
				if(record.data.j=="H")
				{
					var radio_H="<input id=\"game"+(rowIndex+1)+"\" name=\"game"+(rowIndex+1)+"\" class=\"za_dot\" onclick=\"SetGID("+(rowIndex+1)+","+record.data.b+","+record.data.h+",this);\" type=\"radio\" value=\""+record.data.i+",CMH\"/>";
					//var radio_H=String.format("<input id=\"game{0}\" name=\"game{0}\" class=\"za_dot\" onclick=\"SetGID({0},{1},{3},this);\" type=\"radio\" value=\"{2},CMH\"/>",rowIndex+1,record.data.b,record.data.i,record.data.h);
					thisCell="<span class=\"cellM0 MPR\">&nbsp;<span class=\"cellM1 ior\" >"+radio_H+record.data.u+"</span>";
				}
				else
				{
					var radio_H="<input id=\"game"+(rowIndex+1)+"\" name=\"game"+(rowIndex+1)+"\" class=\"za_dot\" onclick=\"SetGID("+(rowIndex+1)+","+record.data.b+","+record.data.h+",this);\" type=\"radio\" value=\""+record.data.i+",CMC\"/>";
					thisCell="<span class=\"cellM0 MPR\">&nbsp;<span class=\"cellM1 ior\" >"+radio_H+record.data.v+"</span>";
				}
				return thisCell;
			}
			
			,CMC = function(value, p , record, rowIndex, columnIndex){
				if(record.data.j=="C")
				{
					var radio_C="<input id=\"game"+(rowIndex+1)+"\" name=\"game"+(rowIndex+1)+"\" class=\"za_dot\" onclick=\"SetGID("+(rowIndex+1)+","+record.data.b+","+record.data.h+",this)\" type=\"radio\" value=\""+record.data.i+",CMH\"/>";
					thisCell="<span class=\"cellM0 MPR\">&nbsp;<span class=\"cellM1 ior\" >"+radio_C+record.data.u+"</span>";
				}
				else
				{
					var radio_C="<input id=\"game"+(rowIndex+1)+"\" name=\"game"+(rowIndex+1)+"\" class=\"za_dot\" onclick=\"SetGID("+(rowIndex+1)+","+record.data.b+","+record.data.h+",this)\" type=\"radio\" value=\""+record.data.i+",CMC\"/>";
					thisCell="<span class=\"cellM0 MPR\">&nbsp;<span class=\"cellM1 ior\" >"+radio_C+record.data.v+"</span>";
				}
				return thisCell;
			}
			
			,CMN = function(value, p , record, rowIndex, columnIndex){
				if(record.data.w=='') return "<div>&nbsp;</div>";
				var radio_N="<input id=\"game"+(rowIndex+1)+"\" name=\"game"+(rowIndex+1)+"\" class=\"za_dot\" onclick=\"SetGID("+(rowIndex+1)+","+record.data.b+","+record.data.h+",this)\" type=\"radio\" value=\""+record.data.i+",CMN\"/>";
				thisCell="<span class=\"cellM0 MPR\">&nbsp;<span class=\"cellM1 ior\" >"+radio_N+record.data.w+"</span>";
				return thisCell;
			}
			//一輸二贏
			,R2 = function(value, p , record, rowIndex, columnIndex){
				//alert(record.data.a0+' '+record.data.a1);
				if(record.data.a0=='' || record.data.a1=='') return ''
				var con_H;var con_C;
				
				if(record.data.j=='H')
				{
					con_C='&nbsp;';
					con_H='1.5';
				}
				else
				{
					con_C='1.5';
					con_H='&nbsp;';
				}
				
				var RE='';
				if(opt.rtype=="RE" || record.data.runball=="Y") RE='1';
				
				var thisCell=''
				switch(opt.gtype)
				{
					case "FT":
							thisCell= "<span  class=\"cellR con\">"+con_H+"</span><a href=\"#\" class=\"cellR ior\" onclick=\"return doOrder('"+opt.gtype+"',"+record.data.b+",'2R','H','"+record.data.a0+"','"+RE+"')\">"+record.data.a0+"</a><br><span  class=\"cellR con\">"+con_C+"</span><a href=\"#\" class=\"cellR ior\"  onclick=\"return doOrder('"+opt.gtype+"',"+record.data.b+",'2R','C','"+record.data.a1+"','"+RE+"')\">"+record.data.a1+"</a>";
						break;
					default:
							thisCell= "<span  class=\"cellR con\">"+con_C+"</span><a href=\"#\" class=\"cellR ior\" onclick=\"return doOrder('"+opt.gtype+"',"+record.data.b+",'2R','C','"+record.data.a1+"','"+RE+"')\">"+record.data.a1+"</a><br><span  class=\"cellR con\">"+con_H+"</span><a href=\"#\" class=\"cellR ior\"  onclick=\"return doOrder('"+opt.gtype+"',"+record.data.b+",'2R','H','"+record.data.a0+"','"+RE+"')\">"+record.data.a0+"</a>";
						break;
				}
				switch(opt.gtype+'_'+opt.rtype)
				{
					case "BS_MPR":
							thisCell= "<span  class=\"cellR con\">"+con_C+"</span><a href=\"#\" class=\"cellR ior\" onclick=\"return doOrder_mpr('"+opt.gtype+"',"+record.data.b+",'2R','C','"+record.data.a1+"','"+RE+"')\">"+record.data.a1+"</a><br><span  class=\"cellR con\">"+con_H+"</span><a href=\"#\" class=\"cellR ior\"  onclick=\"return doOrder_mpr('"+opt.gtype+"',"+record.data.b+",'2R','H','"+record.data.a0+"','"+RE+"')\">"+record.data.a0+"</a>";
						break;
				break;
					default:
						break;
				}
				return thisCell;
			}
			,live = function(value, p , record, rowIndex, columnIndex){
				if(!value)
				{
					if(opt.gtype=="BS") 
					{
						info_href="../GameInfo/GetInfo.php?uid="+opt.uid+"&gtype="+opt.gtype+"&game_date="+record.data.c+"&num1="+record.data.h+"&num2="+record.data.i+"";
						info_image="<img width=\"15\" src=\"../../../images/info.gif\" complete=\"complete\"/></img>";
						info = "<br><a href=\""+info_href+"\" target=\"_blank\">"+info_image+"</a>";
						return info;
					}
					else
					{
						return "<div>&nbsp;</div>";
					}
				}
				var t=value.split("|");
				
				switch(opt.gtype)
				{
					case "BK":
							var tmp=record.data.team_c.split("-");
							var team1=tmp[0];
							tmp='';tmp=record.data.team_h.split("-");
							var team2=tmp[0];
							//var gametime=record.data.timestamp.getYear()+''+record.data.timestamp.getMonth();
							var gametime='';
							var text='';
							var image='';
							var href='';
							t[0]=t[0].replace('直播',EZ.lang('直播')+'<br>');
							text="<font style=\"color: #0f5b97; font-size: 10px;\">"+t[0]+"</font>";
							image="<img title=\"網路"+t[1]+"\" src=\"../../../images/tv.gif\" complete=\"complete\"/></img>";
							href="../live_video/live_main.php?uid="+opt.uid+"&gtype="+opt.gtype+"&gid="+record.data.b+"&rtype=RE&RE=1&type=H";
							return text+"<br><a href=\""+href+"\" target=\"_blank\">"+image+"</a>";
						break;
						
					default:
							var text='';
							var image='';
							var info='';
							var info_href='';
							var info_image='';
							t[0]=t[0].replace('直播',EZ.lang('直播')+'<br>');
							text="<font style=\"color: #0f5b97; font-size: 10px;\">"+t[0]+"</font>";
							image="<img title=\"網路"+t[1]+"\" src=\"../../../images/tv.gif\" complete=\"complete\"/></img>";
							if(opt.gtype=="BS" && record.data.runball != "Y")
							{
								info_href="../GameInfo/GetInfo.php?uid="+opt.uid+"&gtype="+opt.gtype+"&game_date="+record.data.c+"&num1="+record.data.h+"&num2="+record.data.i+"";
								info_image="<img width=\"15\" src=\"/images/info.gif\" complete=\"complete\"/></img>";
								info = "<br><a href=\""+info_href+"\" target=\"_blank\">"+info_image+"</a>";
							}
							if(opt.gtype=="RE")
								href="../live_video/live_main.php?uid="+opt.uid+"&gtype="+record.data.gtype+"&gid="+record.data.b+"&rtype=RE&RE=1&type=H";
							else
								href="../live_video/live_main.php?uid="+opt.uid+"&gtype="+opt.gtype+"&gid="+record.data.b+"&rtype=RE&RE=1&type=H";
							return text+"<br><a href=\""+href+"\" target=\"_blank\">"+image+"</a>"+info+"";
						break;
				}
			}
			,ps = function(value, p , record, rowIndex, columnIndex){
				return "<div class='showOther'></div>";
				if(record.data.y!=0 || record.data.runball=="Y") return "<div>&nbsp;</div>";
				var thisCell='';
				switch(opt.gtype)
				{
					case "FT":
						var thisCell = "<div class=\"showother\" id=\"other_{0}\" onclick=\"show_other("+record.data.e+","+record.data.b+",'"+record.data.team_h+"','"+record.data.team_c+"')\"></div>";
						break;
					default:
						thisCell = "";
						break;
				}
				return thisCell;
			}
			,league = function(value, p , record, rowIndex, columnIndex){
				var value = record.data.leaguename;
			   if(record.data.runball == "Y")return " <font color=\"red\">&nbsp;"+EZ.lang("聯盟")+": "+value+"</font>";
			   else return "<font>&nbsp;"+EZ.lang("聯盟")+": "+value+"</font>";
			}
			,FG = function(value, p , record, rowIndex, columnIndex){
				if(record.data.s == 0 || record.data.t== 0) return ''
				var RE='';
				if(opt.rtype=="RE") RE='1';
				switch(opt.gtype)
				{
					default:
							return "<span class=\"cellM0\">&nbsp;</span><a href=\"#\" class=\"cellM1 ior\"  onclick=\"return doOrder('"+opt.gtype+"',"+record.data.b+",'FG','C','"+record.data.t+"','"+RE+"')\">"+record.data.t+"</a><br><span class=\"cellM0\">&nbsp;</span><a href=\"#\" class=\"cellM1 ior\" onclick=\"return doOrder('"+opt.gtype+"',"+record.data.b+",'FG','H','"+record.data.s+"','"+RE+"')\">"+record.data.s+"</a><br>";
						break;
				}
			}
			,score = function(value, p ,record){
				switch(opt.gtype)
				{
					case "RE":
							if(record.data.gtype=='FT')
								return "<span class=\"score\">"+record.data.v+"</span><br><span class=\"score\">"+record.data.w+"</span>";
							break;
					case "FT":
								return "<span class=\"score\">"+record.data.v+"</span><br><span class=\"score\">"+record.data.w+"</span>";
							break;
					default:break;
				}
			}
			,sorter = function(ds){
				ds.sort(function(a,b){
					return parseInt(a['b']) - parseInt(b['b']);
				});
				ds.sort(function(a,b){
					return parseInt(a['e']) - parseInt(b['e']);
				});
				return ds;
			}
			var sorter2 = function(ds){
				ds.sort(function(a,b){
					return a['e'] - b['e'];
				});
				
				var _ds = [];
				var e = 0;
				var tmp = [];
				for(var i=0;i<ds.length;i++)
				{
					var d = ds[i];
					if(e == 0) e = d.e;
					if( d.e != e)
					{
						tmp.sort(function(a,b){
							return a['b'] - b['b'];
						})
						for(var j=0;j<tmp.length;j++)
							_ds[_ds.length] = tmp[j];
						tmp = [];
						e = d.e;
					}
					else
					{
						tmp[tmp.length] = d;
					}
				}
				// var tt = [];
				// for(var i=0;i<10;i++)
				// {
					// tt[tt.length] = _ds[i]['e']+' '+_ds[i]['b'];
				// }
				// alert(tt.join('\n'));
				return _ds;
			}
			,option = function(o){
				if(typeof o.gtype != 'undefined' && o.gtype != null){
					opt.gtype = o.gtype;
				}
				if(typeof o.rtype != 'undefined' && o.rtype != null){
					opt.rtype = o.rtype;
				}
				if(typeof o.uid != 'undefined' && o.uid != null){
					opt.uid = o.uid;
				}
				if(typeof o.renderTo != 'undefined'){
					opt.renderTo = o.renderTo;
				}
				opt.columns = columns();
			}
			//暫存 insert 跟 update 更新變色用
			,tmpInsert = []
			,tmpUpdate = []
			,setColor = function(){
				/*
				for(var i=0;i<tmpInsert.length;i++)
				{
					var d = tmpInsert[i];
					//d.style.backgroundColor='#f4a460';
					//d.className = d.className.toString().replace(' rowInsert','');
					d.className = d.className.toString()+' rowInsert';
				}
				*/
			}
			,clearColor = function(){
				/*
				for(var i=0;i<tmpInsert.length;i++)
				{
					var d = tmpInsert[i];
					//d.style.backgroundColor='#fff';
					d.className = d.className.toString().replace(' rowInsert','');
				}
				*/
				for(var i=0;i<tmpUpdate.length;i++)
				{
					var d = tmpUpdate[i];
					d.className = d.className.toString().replace(' cellUpdate','');
				}
				tmpInsert= [];
				tmpUpdate= [];
			}
			