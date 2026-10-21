var ai={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},oi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},jc=0,_l=1,Qc=2;var xl=1,eh=2,An=3,zn=0,Gt=1,cn=2,Wn=0,yi=1,gn=2,yl=3,vl=4,Ma=5,ii=100,th=101,nh=102,ih=103,sh=104,rh=200,ba=201,ah=202,oh=203,Gr=204,Ji=205,lh=206,ch=207,hh=208,uh=209,dh=210,fh=211,ph=212,mh=213,gh=214,Sa=0,Ta=1,wa=2,vi=3,Ea=4,Aa=5,Ca=6,Ra=7,Ml=0,_h=1,xh=2,Xn=0,yh=1,vh=2,Mh=3,bh=4,Sh=5,Th=6,wh=7;var bl=300,wi=301,Ei=302,Pa=303,Ia=304,nr=306,Hr=1e3,ni=1001,Wr=1002,Wt=1003,Eh=1004;var ir=1005;var mn=1006,La=1007;var li=1008;var Cn=1009,Sl=1010,Tl=1011,cs=1012,Da=1013,ci=1014,_n=1015,hs=1016,Ua=1017,Na=1018,us=1020,wl=35902,El=35899,Al=1021,Cl=1022,hn=1023,ji=1026,ds=1027,Fa=1028,Oa=1029,Rl=1030,Ba=1031;var za=1033,sr=33776,rr=33777,ar=33778,or=33779,ka=35840,Va=35841,Ga=35842,Ha=35843,Wa=36196,Xa=37492,qa=37496,Ya=37808,Za=37809,Ka=37810,$a=37811,Ja=37812,ja=37813,Qa=37814,eo=37815,to=37816,no=37817,io=37818,so=37819,ro=37820,ao=37821,oo=36492,lo=36494,co=36495,ho=36283,uo=36284,fo=36285,po=36286;var Fs=2300,Xr=2301,Vr=2302,cl=2400,hl=2401,ul=2402;var Ah=3200,Ch=3201;var Rh=0,Ph=1,qn="",Nt="srgb",Mi="srgb-linear",Os="linear",Ze="srgb";var xi=7680;var dl=519,Ih=512,Lh=513,Dh=514,Pl=515,Uh=516,Nh=517,Fh=518,Oh=519,fl=35044;var Il="300 es",pn=2e3,Bs=2001;var Mn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sc=1234567,Ls=Math.PI/180,Qi=180/Math.PI;function fs(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function Be(i,e,t){return Math.max(e,Math.min(t,i))}function Ll(i,e){return(i%e+e)%e}function i0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function s0(i,e,t){return i!==e?(t-i)/(e-i):0}function Ds(i,e,t){return(1-t)*i+t*e}function r0(i,e,t,n){return Ds(i,e,1-Math.exp(-t*n))}function a0(i,e=1){return e-Math.abs(Ll(i,e*2)-e)}function o0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function l0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function c0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function h0(i,e){return i+Math.random()*(e-i)}function u0(i){return i*(.5-Math.random())}function d0(i){i!==void 0&&(Sc=i);let e=Sc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function f0(i){return i*Ls}function p0(i){return i*Qi}function m0(i){return(i&i-1)===0&&i!==0}function g0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function x0(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),f=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*d,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*p,o*l);break;case"YXY":i.set(c*p,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*p,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ki(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Dl={DEG2RAD:Ls,RAD2DEG:Qi,generateUUID:fs,clamp:Be,euclideanModulo:Ll,mapLinear:i0,inverseLerp:s0,lerp:Ds,damp:r0,pingpong:a0,smoothstep:o0,smootherstep:l0,randInt:c0,randFloat:h0,randFloatSpread:u0,seededRandom:d0,degToRad:f0,radToDeg:p0,isPowerOfTwo:m0,ceilPowerOfTwo:g0,floorPowerOfTwo:_0,setQuaternionFromProperEuler:x0,normalize:Vt,denormalize:Ki},fe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Be(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Be(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],f=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(d!==x||c!==f||l!==p||h!==g){let m=1-o,u=c*f+l*p+h*g+d*x,w=u>=0?1:-1,S=1-u*u;if(S>Number.EPSILON){let R=Math.sqrt(S),C=Math.atan2(R,u*w);m=Math.sin(m*C)/R,o=Math.sin(o*C)/R}let v=o*w;if(c=c*m+f*v,l=l*m+p*v,h=h*m+g*v,d=d*m+x*v,m===1-o){let R=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=R,l*=R,h*=R,d*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*d+c*p-l*f,e[t+1]=c*g+h*f+l*d-o*p,e[t+2]=l*g+h*p+o*f-c*d,e[t+3]=h*g-o*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*d+l*p*g,this._y=l*p*d-f*h*g,this._z=l*h*g+f*p*d,this._w=l*h*d-f*p*g;break;case"YXZ":this._x=f*h*d+l*p*g,this._y=l*p*d-f*h*g,this._z=l*h*g-f*p*d,this._w=l*h*d+f*p*g;break;case"ZXY":this._x=f*h*d-l*p*g,this._y=l*p*d+f*h*g,this._z=l*h*g+f*p*d,this._w=l*h*d-f*p*g;break;case"ZYX":this._x=f*h*d-l*p*g,this._y=l*p*d+f*h*g,this._z=l*h*g-f*p*d,this._w=l*h*d+f*p*g;break;case"YZX":this._x=f*h*d+l*p*g,this._y=l*p*d+f*h*g,this._z=l*h*g-f*p*d,this._w=l*h*d-f*p*g;break;case"XZY":this._x=f*h*d-l*p*g,this._y=l*p*d-f*h*g,this._z=l*h*g+f*p*d,this._w=l*h*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Be(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Bo.copy(this).projectOnVector(e),this.sub(Bo)}reflect(e){return this.sub(Bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Be(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Bo=new E,Tc=new Qt,Ie=class i{constructor(e,t,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],f=n[2],p=n[5],g=n[8],x=s[0],m=s[3],u=s[6],w=s[1],S=s[4],v=s[7],R=s[2],C=s[5],P=s[8];return r[0]=a*x+o*w+c*R,r[3]=a*m+o*S+c*C,r[6]=a*u+o*v+c*P,r[1]=l*x+h*w+d*R,r[4]=l*m+h*S+d*C,r[7]=l*u+h*v+d*P,r[2]=f*x+p*w+g*R,r[5]=f*m+p*S+g*C,r[8]=f*u+p*v+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,f=o*c-h*r,p=l*r-a*c,g=t*d+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(s*l-h*n)*x,e[2]=(o*n-s*a)*x,e[3]=f*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(zo.makeScale(e,t)),this}rotate(e){return this.premultiply(zo.makeRotation(-e)),this}translate(e,t){return this.premultiply(zo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},zo=new Ie;function Ul(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function zs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bh(){let i=zs("canvas");return i.style.display="block",i}var wc={};function es(i){i in wc||(wc[i]=!0,console.warn(i))}function zh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Ec=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ac=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function y0(){let i={enabled:!0,workingColorSpace:Mi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ze&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(s.r=$i(s.r),s.g=$i(s.g),s.b=$i(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qn?Os:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return es("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return es("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mi]:{primaries:e,whitePoint:n,transfer:Os,toXYZ:Ec,fromXYZ:Ac,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:Ec,fromXYZ:Ac,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}var He=y0();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Fi,qr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fi===void 0&&(Fi=zs("canvas")),Fi.width=e.width,Fi.height=e.height;let s=Fi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Fi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=zs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bn(t[n]/255)*255):t[n]=Bn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},v0=0,ts=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ko(s[a].image)):r.push(ko(s[a]))}else r=ko(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ko(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var M0=0,Vo=new E,Xt=class i extends Mn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ni,s=ni,r=mn,a=li,o=hn,c=Cn,l=i.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=fs(),this.name="",this.source=new ts(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Vo).x}get height(){return this.source.getSize(Vo).y}get depth(){return this.source.getSize(Vo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hr:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case Wr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hr:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case Wr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=bl;Xt.DEFAULT_ANISOTROPY=1;var st=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],f=c[1],p=c[5],g=c[9],x=c[2],m=c[6],u=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,v=(p+1)/2,R=(u+1)/2,C=(h+f)/4,P=(d+x)/4,N=(g+m)/4;return S>v&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=C/n,r=P/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=C/s,r=N/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=N/r),this.set(n,s,r,t),this}let w=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-x)/w,this.z=(f-h)/w,this.w=Math.acos((l+p+u-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Be(this.x,e.x,t.x),this.y=Be(this.y,e.y,t.y),this.z=Be(this.z,e.z,t.z),this.w=Be(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Be(this.x,e,t),this.y=Be(this.y,e,t),this.z=Be(this.z,e,t),this.w=Be(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Be(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yr=class extends Mn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Xt(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ts(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},bn=class extends Yr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ks=class extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Zr=class extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Sn=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(r,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_r.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_r.copy(n.boundingBox)),_r.applyMatrix4(e.matrixWorld),this.union(_r)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ws),xr.subVectors(this.max,ws),Oi.subVectors(e.a,ws),Bi.subVectors(e.b,ws),zi.subVectors(e.c,ws),Kn.subVectors(Bi,Oi),$n.subVectors(zi,Bi),pi.subVectors(Oi,zi);let t=[0,-Kn.z,Kn.y,0,-$n.z,$n.y,0,-pi.z,pi.y,Kn.z,0,-Kn.x,$n.z,0,-$n.x,pi.z,0,-pi.x,-Kn.y,Kn.x,0,-$n.y,$n.x,0,-pi.y,pi.x,0];return!Go(t,Oi,Bi,zi,xr)||(t=[1,0,0,0,1,0,0,0,1],!Go(t,Oi,Bi,zi,xr))?!1:(yr.crossVectors(Kn,$n),t=[yr.x,yr.y,yr.z],Go(t,Oi,Bi,zi,xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Dn=[new E,new E,new E,new E,new E,new E,new E,new E],un=new E,_r=new Sn,Oi=new E,Bi=new E,zi=new E,Kn=new E,$n=new E,pi=new E,ws=new E,xr=new E,yr=new E,mi=new E;function Go(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){mi.fromArray(i,r);let o=s.x*Math.abs(mi.x)+s.y*Math.abs(mi.y)+s.z*Math.abs(mi.z),c=e.dot(mi),l=t.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var b0=new Sn,Es=new E,Ho=new E,on=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):b0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Es.subVectors(e,this.center);let t=Es.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ho.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Es.copy(e.center).add(Ho)),this.expandByPoint(Es.copy(e.center).sub(Ho))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Un=new E,Wo=new E,vr=new E,Jn=new E,Xo=new E,Mr=new E,qo=new E,kn=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Wo.copy(e).add(t).multiplyScalar(.5),vr.copy(t).sub(e).normalize(),Jn.copy(this.origin).sub(Wo);let r=e.distanceTo(t)*.5,a=-this.direction.dot(vr),o=Jn.dot(this.direction),c=-Jn.dot(vr),l=Jn.lengthSq(),h=Math.abs(1-a*a),d,f,p,g;if(h>0)if(d=a*c-o,f=a*o-c,g=r*h,d>=0)if(f>=-g)if(f<=g){let x=1/h;d*=x,f*=x,p=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Wo).addScaledVector(vr,f),p}intersectSphere(e,t){Un.subVectors(e.center,this.origin);let n=Un.dot(this.direction),s=Un.dot(Un)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,s,r){Xo.subVectors(t,e),Mr.subVectors(n,e),qo.crossVectors(Xo,Mr);let a=this.direction.dot(qo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Jn.subVectors(this.origin,e);let c=o*this.direction.dot(Mr.crossVectors(Jn,Mr));if(c<0)return null;let l=o*this.direction.dot(Xo.cross(Jn));if(l<0||c+l>a)return null;let h=-o*Jn.dot(qo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ke=class i{constructor(e,t,n,s,r,a,o,c,l,h,d,f,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,f,p,g,x,m)}set(e,t,n,s,r,a,o,c,l,h,d,f,p,g,x,m){let u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=g,u[11]=x,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ki.setFromMatrixColumn(e,0).length(),r=1/ki.setFromMatrixColumn(e,1).length(),a=1/ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*h,p=a*d,g=o*h,x=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,p=c*d,g=l*h,x=l*d;t[0]=f+x*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,p=c*d,g=l*h,x=l*d;t[0]=f-x*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,p=a*d,g=o*h,x=o*d;t[0]=c*h,t[4]=g*l-p,t[8]=f*l+x,t[1]=c*d,t[5]=x*l+f,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=x-f*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+g,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=f*d+x,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(S0,e,T0)}lookAt(e,t,n){let s=this.elements;return Jt.subVectors(e,t),Jt.lengthSq()===0&&(Jt.z=1),Jt.normalize(),jn.crossVectors(n,Jt),jn.lengthSq()===0&&(Math.abs(n.z)===1?Jt.x+=1e-4:Jt.z+=1e-4,Jt.normalize(),jn.crossVectors(n,Jt)),jn.normalize(),br.crossVectors(Jt,jn),s[0]=jn.x,s[4]=br.x,s[8]=Jt.x,s[1]=jn.y,s[5]=br.y,s[9]=Jt.y,s[2]=jn.z,s[6]=br.z,s[10]=Jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],u=n[14],w=n[3],S=n[7],v=n[11],R=n[15],C=s[0],P=s[4],N=s[8],b=s[12],M=s[1],L=s[5],z=s[9],H=s[13],q=s[2],K=s[6],X=s[10],ne=s[14],V=s[3],ae=s[7],he=s[11],Te=s[15];return r[0]=a*C+o*M+c*q+l*V,r[4]=a*P+o*L+c*K+l*ae,r[8]=a*N+o*z+c*X+l*he,r[12]=a*b+o*H+c*ne+l*Te,r[1]=h*C+d*M+f*q+p*V,r[5]=h*P+d*L+f*K+p*ae,r[9]=h*N+d*z+f*X+p*he,r[13]=h*b+d*H+f*ne+p*Te,r[2]=g*C+x*M+m*q+u*V,r[6]=g*P+x*L+m*K+u*ae,r[10]=g*N+x*z+m*X+u*he,r[14]=g*b+x*H+m*ne+u*Te,r[3]=w*C+S*M+v*q+R*V,r[7]=w*P+S*L+v*K+R*ae,r[11]=w*N+S*z+v*X+R*he,r[15]=w*b+S*H+v*ne+R*Te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],u=e[15];return g*(+r*c*d-s*l*d-r*o*f+n*l*f+s*o*p-n*c*p)+x*(+t*c*p-t*l*f+r*a*f-s*a*p+s*l*h-r*c*h)+m*(+t*l*d-t*o*p-r*a*d+n*a*p+r*o*h-n*l*h)+u*(-s*o*h-t*c*d+t*o*f+s*a*d-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],u=e[15],w=d*m*l-x*f*l+x*c*p-o*m*p-d*c*u+o*f*u,S=g*f*l-h*m*l-g*c*p+a*m*p+h*c*u-a*f*u,v=h*x*l-g*d*l+g*o*p-a*x*p-h*o*u+a*d*u,R=g*d*c-h*x*c-g*o*f+a*x*f+h*o*m-a*d*m,C=t*w+n*S+s*v+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/C;return e[0]=w*P,e[1]=(x*f*r-d*m*r-x*s*p+n*m*p+d*s*u-n*f*u)*P,e[2]=(o*m*r-x*c*r+x*s*l-n*m*l-o*s*u+n*c*u)*P,e[3]=(d*c*r-o*f*r-d*s*l+n*f*l+o*s*p-n*c*p)*P,e[4]=S*P,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*u+t*f*u)*P,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*u-t*c*u)*P,e[7]=(a*f*r-h*c*r+h*s*l-t*f*l-a*s*p+t*c*p)*P,e[8]=v*P,e[9]=(g*d*r-h*x*r-g*n*p+t*x*p+h*n*u-t*d*u)*P,e[10]=(a*x*r-g*o*r+g*n*l-t*x*l-a*n*u+t*o*u)*P,e[11]=(h*o*r-a*d*r-h*n*l+t*d*l+a*n*p-t*o*p)*P,e[12]=R*P,e[13]=(h*x*s-g*d*s+g*n*f-t*x*f-h*n*m+t*d*m)*P,e[14]=(g*o*s-a*x*s-g*n*c+t*x*c+a*n*m-t*o*m)*P,e[15]=(a*d*s-h*o*s+h*n*c-t*d*c-a*n*f+t*o*f)*P,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,f=r*l,p=r*h,g=r*d,x=a*h,m=a*d,u=o*d,w=c*l,S=c*h,v=c*d,R=n.x,C=n.y,P=n.z;return s[0]=(1-(x+u))*R,s[1]=(p+v)*R,s[2]=(g-S)*R,s[3]=0,s[4]=(p-v)*C,s[5]=(1-(f+u))*C,s[6]=(m+w)*C,s[7]=0,s[8]=(g+S)*P,s[9]=(m-w)*P,s[10]=(1-(f+x))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ki.set(s[0],s[1],s[2]).length(),a=ki.set(s[4],s[5],s[6]).length(),o=ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],dn.copy(this);let l=1/r,h=1/a,d=1/o;return dn.elements[0]*=l,dn.elements[1]*=l,dn.elements[2]*=l,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,t.setFromRotationMatrix(dn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=pn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s),g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===pn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Bs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=pn,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s),g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===pn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Bs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ki=new E,dn=new Ke,S0=new E(0,0,0),T0=new E(1,1,1),jn=new E,br=new E,Jt=new E,Cc=new Ke,Rc=new Qt,Tn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Be(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rc.setFromEuler(this),this.setFromQuaternion(Rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tn.DEFAULT_ORDER="XYZ";var ns=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},w0=0,Pc=new E,Vi=new Qt,Nn=new Ke,Sr=new E,As=new E,E0=new E,A0=new Qt,Ic=new E(1,0,0),Lc=new E(0,1,0),Dc=new E(0,0,1),Uc={type:"added"},C0={type:"removed"},Gi={type:"childadded",child:null},Yo={type:"childremoved",child:null},Ot=class i extends Mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new E,t=new Tn,n=new Qt,s=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ke},normalMatrix:{value:new Ie}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Ic,e)}rotateY(e){return this.rotateOnAxis(Lc,e)}rotateZ(e){return this.rotateOnAxis(Dc,e)}translateOnAxis(e,t){return Pc.copy(e).applyQuaternion(this.quaternion),this.position.add(Pc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ic,e)}translateY(e){return this.translateOnAxis(Lc,e)}translateZ(e){return this.translateOnAxis(Dc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Sr.copy(e):Sr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(As,Sr,this.up):Nn.lookAt(Sr,As,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),Vi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(C0),Yo.child=e,this.dispatchEvent(Yo),Yo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,e,E0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,A0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Ot.DEFAULT_UP=new E(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fn=new E,Fn=new E,Zo=new E,On=new E,Hi=new E,Wi=new E,Nc=new E,Ko=new E,$o=new E,Jo=new E,jo=new st,Qo=new st,el=new st,ti=class i{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),fn.subVectors(e,t),s.cross(fn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){fn.subVectors(s,t),Fn.subVectors(n,t),Zo.subVectors(e,t);let a=fn.dot(fn),o=fn.dot(Fn),c=fn.dot(Zo),l=Fn.dot(Fn),h=Fn.dot(Zo),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,p=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,On)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,On.x),c.addScaledVector(a,On.y),c.addScaledVector(o,On.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return jo.setScalar(0),Qo.setScalar(0),el.setScalar(0),jo.fromBufferAttribute(e,t),Qo.fromBufferAttribute(e,n),el.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(jo,r.x),a.addScaledVector(Qo,r.y),a.addScaledVector(el,r.z),a}static isFrontFacing(e,t,n,s){return fn.subVectors(n,t),Fn.subVectors(e,t),fn.cross(Fn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),fn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Hi.subVectors(s,n),Wi.subVectors(r,n),Ko.subVectors(e,n);let c=Hi.dot(Ko),l=Wi.dot(Ko);if(c<=0&&l<=0)return t.copy(n);$o.subVectors(e,s);let h=Hi.dot($o),d=Wi.dot($o);if(h>=0&&d<=h)return t.copy(s);let f=c*d-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Hi,a);Jo.subVectors(e,r);let p=Hi.dot(Jo),g=Wi.dot(Jo);if(g>=0&&p<=g)return t.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Wi,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Nc.subVectors(r,s),o=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(Nc,o);let u=1/(m+x+f);return a=x*u,o=f*u,t.copy(n).addScaledVector(Hi,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function tl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,He.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=He.workingColorSpace){return this.r=e,this.g=t,this.b=n,He.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=He.workingColorSpace){if(e=Ll(e,1),t=Be(t,0,1),n=Be(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=tl(a,r,e+1/3),this.g=tl(a,r,e),this.b=tl(a,r,e-1/3)}return He.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=kh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bn(e.r),this.g=Bn(e.g),this.b=Bn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return He.workingToColorSpace(Ut.copy(this),e),Math.round(Be(Ut.r*255,0,255))*65536+Math.round(Be(Ut.g*255,0,255))*256+Math.round(Be(Ut.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=He.workingColorSpace){He.workingToColorSpace(Ut.copy(this),t);let n=Ut.r,s=Ut.g,r=Ut.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=He.workingColorSpace){return He.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=Nt){He.workingToColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,s=Ut.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(Tr);let n=Ds(Qn.h,Tr.h,t),s=Ds(Qn.s,Tr.s,t),r=Ds(Qn.l,Tr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new Fe;Fe.NAMES=kh;var R0=0,Vn=class extends Mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=fs(),this.name="",this.type="Material",this.blending=yi,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gr,this.blendDst=Ji,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gr&&(n.blendSrc=this.blendSrc),this.blendDst!==Ji&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},wn=class extends Vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var yt=new E,wr=new fe,P0=0,It=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:P0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fl,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyMatrix3(e),this.setXY(t,wr.x,wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fl&&(e.usage=this.usage),e}};var Vs=class extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Gs=class extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var it=class extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}},I0=0,rn=new Ke,nl=new Ot,Xi=new E,jt=new Sn,Cs=new Sn,Rt=new E,ot=class i extends Mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ul(e)?Gs:Vs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ie().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,n){return rn.makeTranslation(e,t,n),this.applyMatrix4(rn),this}scale(e,t,n){return rn.makeScale(e,t,n),this.applyMatrix4(rn),this}lookAt(e){return nl.lookAt(e),nl.updateMatrix(),this.applyMatrix4(nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new it(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(jt.min,Cs.min),jt.expandByPoint(Rt),Rt.addVectors(jt.max,Cs.max),jt.expandByPoint(Rt)):(jt.expandByPoint(Cs.min),jt.expandByPoint(Cs.max))}jt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Rt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Rt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Rt.fromBufferAttribute(o,l),c&&(Xi.fromBufferAttribute(e,l),Rt.add(Xi)),s=Math.max(s,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new E,c[N]=new E;let l=new E,h=new E,d=new E,f=new fe,p=new fe,g=new fe,x=new E,m=new E;function u(N,b,M){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,M),f.fromBufferAttribute(r,N),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(l),d.sub(l),p.sub(f),g.sub(f);let L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),o[N].add(x),o[b].add(x),o[M].add(x),c[N].add(m),c[b].add(m),c[M].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let N=0,b=w.length;N<b;++N){let M=w[N],L=M.start,z=M.count;for(let H=L,q=L+z;H<q;H+=3)u(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let S=new E,v=new E,R=new E,C=new E;function P(N){R.fromBufferAttribute(s,N),C.copy(R);let b=o[N];S.copy(b),S.sub(R.multiplyScalar(R.dot(b))).normalize(),v.crossVectors(C,b);let L=v.dot(c[N])<0?-1:1;a.setXYZW(N,S.x,S.y,S.z,L)}for(let N=0,b=w.length;N<b;++N){let M=w[N],L=M.start,z=M.count;for(let H=L,q=L+z;H<q;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new E,r=new E,a=new E,o=new E,c=new E,l=new E,h=new E,d=new E;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,d=o.normalized,f=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*h;for(let u=0;u<h;u++)f[g++]=l[p++]}return new It(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,f=l.length;d<f;d++){let p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fc=new Ke,gi=new kn,Er=new on,Oc=new E,Ar=new E,Cr=new E,Rr=new E,il=new E,Pr=new E,Bc=new E,Ir=new E,ft=class extends Ot{constructor(e=new ot,t=new wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Pr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(il.fromBufferAttribute(d,e),a?Pr.addScaledVector(il,h):Pr.addScaledVector(il.sub(t),h))}t.add(Pr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),gi.copy(e.ray).recast(e.near),!(Er.containsPoint(gi.origin)===!1&&(gi.intersectSphere(Er,Oc)===null||gi.origin.distanceToSquared(Oc)>(e.far-e.near)**2))&&(Fc.copy(r).invert(),gi.copy(e.ray).applyMatrix4(Fc),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],u=a[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=w,R=S;v<R;v+=3){let C=o.getX(v),P=o.getX(v+1),N=o.getX(v+2);s=Lr(this,u,e,n,l,h,d,C,P,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,u=x;m<u;m+=3){let w=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);s=Lr(this,a,e,n,l,h,d,w,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],u=a[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=w,R=S;v<R;v+=3){let C=v,P=v+1,N=v+2;s=Lr(this,u,e,n,l,h,d,C,P,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,u=x;m<u;m+=3){let w=m,S=m+1,v=m+2;s=Lr(this,a,e,n,l,h,d,w,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function L0(i,e,t,n,s,r,a,o){let c;if(e.side===Gt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===zn,o),c===null)return null;Ir.copy(o),Ir.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ir);return l<t.near||l>t.far?null:{distance:l,point:Ir.clone(),object:i}}function Lr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ar),i.getVertexPosition(c,Cr),i.getVertexPosition(l,Rr);let h=L0(i,e,t,n,Ar,Cr,Rr,Bc);if(h){let d=new E;ti.getBarycoord(Bc,Ar,Cr,Rr,d),s&&(h.uv=ti.getInterpolatedAttribute(s,o,c,l,d,new fe)),r&&(h.uv1=ti.getInterpolatedAttribute(r,o,c,l,d,new fe)),a&&(h.normal=ti.getInterpolatedAttribute(a,o,c,l,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new E,materialIndex:0};ti.getNormal(Ar,Cr,Rr,f.normal),h.face=f,h.barycoord=d}return h}var is=class i extends ot{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(d,2));function g(x,m,u,w,S,v,R,C,P,N,b){let M=v/P,L=R/N,z=v/2,H=R/2,q=C/2,K=P+1,X=N+1,ne=0,V=0,ae=new E;for(let he=0;he<X;he++){let Te=he*L-H;for(let ke=0;ke<K;ke++){let tt=ke*M-z;ae[x]=tt*w,ae[m]=Te*S,ae[u]=q,l.push(ae.x,ae.y,ae.z),ae[x]=0,ae[m]=0,ae[u]=C>0?1:-1,h.push(ae.x,ae.y,ae.z),d.push(ke/P),d.push(1-he/N),ne+=1}}for(let he=0;he<N;he++)for(let Te=0;Te<P;Te++){let ke=f+Te+K*he,tt=f+Te+K*(he+1),lt=f+(Te+1)+K*(he+1),qe=f+(Te+1)+K*he;c.push(ke,tt,qe),c.push(tt,lt,qe),V+=6}o.addGroup(p,V,b),p+=V,f+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ai(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Bt(i){let e={};for(let t=0;t<i.length;t++){let n=Ai(i[t]);for(let s in n)e[s]=n[s]}return e}function D0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Nl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:He.workingColorSpace}var Vh={clone:Ai,merge:Bt},U0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,N0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,vt=class extends Vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=U0,this.fragmentShader=N0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ai(e.uniforms),this.uniformsGroups=D0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Hs=class extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ei=new E,zc=new fe,kc=new fe,Ft=class extends Hs{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ei.x,ei.y).multiplyScalar(-e/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-e/ei.z)}getViewSize(e,t){return this.getViewBounds(e,zc,kc),t.subVectors(kc,zc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},qi=-90,Yi=1,Kr=class extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ft(qi,Yi,e,t);s.layers=this.layers,this.add(s);let r=new Ft(qi,Yi,e,t);r.layers=this.layers,this.add(r);let a=new Ft(qi,Yi,e,t);a.layers=this.layers,this.add(a);let o=new Ft(qi,Yi,e,t);o.layers=this.layers,this.add(o);let c=new Ft(qi,Yi,e,t);c.layers=this.layers,this.add(c);let l=new Ft(qi,Yi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ws=class extends Xt{constructor(e=[],t=wi,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},$r=class extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ws(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new is(5,5,5),r=new vt({name:"CubemapFromEquirect",uniforms:Ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:Wn});r.uniforms.tEquirect.value=t;let a=new ft(s,r),o=t.minFilter;return t.minFilter===li&&(t.minFilter=mn),new Kr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Tt=class extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}},F0={type:"move"},ss=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),u=this._getHandJoint(l,x);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(F0)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var rs=class extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Jr=class extends Xt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Wt,h=Wt,d,f){super(null,a,o,c,l,h,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xs=class extends It{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Zi=new Ke,Vc=new Ke,Dr=[],Gc=new Sn,O0=new Ke,Rs=new ft,Ps=new on,qs=class extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,O0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zi),Gc.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(Gc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new on),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zi),Ps.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Ps)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Rs.geometry=this.geometry,Rs.material=this.material,Rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ps.copy(this.boundingSphere),Ps.applyMatrix4(n),e.ray.intersectsSphere(Ps)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zi),Vc.multiplyMatrices(n,Zi),Rs.matrixWorld=Vc,Rs.raycast(e,Dr);for(let a=0,o=Dr.length;a<o;a++){let c=Dr[a];c.instanceId=r,c.object=this,t.push(c)}Dr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Jr(new Float32Array(s*this.count),s,this.count,Fa,_n));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},sl=new E,B0=new E,z0=new Ie,an=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=sl.subVectors(n,t).cross(B0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(sl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||z0.getNormalMatrix(e),s=this.coplanarPoint(sl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},_i=new on,k0=new fe(.5,.5),Ur=new E,Ys=class{constructor(e=new an,t=new an,n=new an,s=new an,r=new an,a=new an){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],f=r[6],p=r[7],g=r[8],x=r[9],m=r[10],u=r[11],w=r[12],S=r[13],v=r[14],R=r[15];if(s[0].setComponents(l-a,p-h,u-g,R-w).normalize(),s[1].setComponents(l+a,p+h,u+g,R+w).normalize(),s[2].setComponents(l+o,p+d,u+x,R+S).normalize(),s[3].setComponents(l-o,p-d,u-x,R-S).normalize(),n)s[4].setComponents(c,f,m,v).normalize(),s[5].setComponents(l-c,p-f,u-m,R-v).normalize();else if(s[4].setComponents(l-c,p-f,u-m,R-v).normalize(),t===pn)s[5].setComponents(l+c,p+f,u+m,R+v).normalize();else if(t===Bs)s[5].setComponents(c,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);let t=k0.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ur.x=s.normal.x>0?e.max.x:e.min.x,Ur.y=s.normal.y>0?e.max.y:e.min.y,Ur.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var En=class extends Vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},jr=new E,Qr=new E,Hc=new Ke,Is=new kn,Nr=new on,rl=new E,Wc=new E,Gn=class extends Ot{constructor(e=new ot,t=new En){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)jr.fromBufferAttribute(t,s-1),Qr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=jr.distanceTo(Qr);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),Nr.radius+=r,e.ray.intersectsSphere(Nr)===!1)return;Hc.copy(s).invert(),Is.copy(e.ray).applyMatrix4(Hc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=l){let u=h.getX(x),w=h.getX(x+1),S=Fr(this,e,Is,c,u,w,x);S&&t.push(S)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),u=Fr(this,e,Is,c,x,m,g-1);u&&t.push(u)}}else{let p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=l){let u=Fr(this,e,Is,c,x,x+1,x);u&&t.push(u)}if(this.isLineLoop){let x=Fr(this,e,Is,c,g-1,p,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Fr(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(jr.fromBufferAttribute(o,s),Qr.fromBufferAttribute(o,r),t.distanceSqToSegment(jr,Qr,rl,Wc)>n)return;rl.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(rl);if(!(l<e.near||l>e.far))return{distance:l,point:Wc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Xc=new E,qc=new E,bi=class extends Gn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Xc.fromBufferAttribute(t,s),qc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Xc.distanceTo(qc);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ea=class extends Vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Yc=new Ke,pl=new kn,Or=new on,Br=new E,as=class extends Ot{constructor(e=new ot,t=new ea){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(s),Or.radius+=r,e.ray.intersectsSphere(Or)===!1)return;Yc.copy(s).invert(),pl.copy(e.ray).applyMatrix4(Yc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=f,x=p;g<x;g++){let m=l.getX(g);Br.fromBufferAttribute(d,m),Zc(Br,m,c,s,e,t,this)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=f,x=p;g<x;g++)Br.fromBufferAttribute(d,g),Zc(Br,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Zc(i,e,t,n,s,r,a){let o=pl.distanceSqToPoint(i);if(o<t){let c=new E;pl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Zs=class extends Xt{constructor(e,t,n=ci,s,r,a,o=Wt,c=Wt,l,h=ji,d=1){if(h!==ji&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ts(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ks=class extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],f=n[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new fe:new E);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,s=[],r=[],a=[],o=new E,c=new Ke;for(let p=0;p<=e;p++){let g=p/e;s[p]=this.getTangentAt(g,new E)}r[0]=new E,a[0]=new E;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Be(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Be(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},$s=class extends ln{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new fe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*h-p*d+this.aX,l=f*d+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ta=class extends $s{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Fl(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+d)+(c-o)/d;f*=h,p*=h,s(a,o,f,p)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var zr=new E,al=new Fl,ol=new Fl,ll=new Fl,os=class extends ln{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new E){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(zr.subVectors(s[0],s[1]).add(s[0]),l=zr);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(zr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zr),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),al.initNonuniformCatmullRom(l.x,d.x,f.x,h.x,g,x,m),ol.initNonuniformCatmullRom(l.y,d.y,f.y,h.y,g,x,m),ll.initNonuniformCatmullRom(l.z,d.z,f.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(al.initCatmullRom(l.x,d.x,f.x,h.x,this.tension),ol.initCatmullRom(l.y,d.y,f.y,h.y,this.tension),ll.initCatmullRom(l.z,d.z,f.z,h.z,this.tension));return n.set(al.calc(c),ol.calc(c),ll.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new E().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Kc(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function V0(i,e){let t=1-i;return t*t*e}function G0(i,e){return 2*(1-i)*i*e}function H0(i,e){return i*i*e}function Us(i,e,t,n){return V0(i,e)+G0(i,t)+H0(i,n)}function W0(i,e){let t=1-i;return t*t*t*e}function X0(i,e){let t=1-i;return 3*t*t*i*e}function q0(i,e){return 3*(1-i)*i*i*e}function Y0(i,e){return i*i*i*e}function Ns(i,e,t,n,s){return W0(i,e)+X0(i,t)+q0(i,n)+Y0(i,s)}var na=class extends ln{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ns(e,s.x,r.x,a.x,o.x),Ns(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ia=class extends ln{constructor(e=new E,t=new E,n=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new E){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ns(e,s.x,r.x,a.x,o.x),Ns(e,s.y,r.y,a.y,o.y),Ns(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sa=class extends ln{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ra=class extends ln{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},aa=class extends ln{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Us(e,s.x,r.x,a.x),Us(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Js=class extends ln{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Us(e,s.x,r.x,a.x),Us(e,s.y,r.y,a.y),Us(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oa=class extends ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Kc(o,c.x,l.x,h.x,d.x),Kc(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new fe().fromArray(s))}return this}},Z0=Object.freeze({__proto__:null,ArcCurve:ta,CatmullRomCurve3:os,CubicBezierCurve:na,CubicBezierCurve3:ia,EllipseCurve:$s,LineCurve:sa,LineCurve3:ra,QuadraticBezierCurve:aa,QuadraticBezierCurve3:Js,SplineCurve:oa});var Si=class i extends ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,f=t/c,p=[],g=[],x=[],m=[];for(let u=0;u<h;u++){let w=u*f-a;for(let S=0;S<l;S++){let v=S*d-r;g.push(v,-w,0),x.push(0,0,1),m.push(S/o),m.push(1-u/c)}}for(let u=0;u<c;u++)for(let w=0;w<o;w++){let S=w+l*u,v=w+l*(u+1),R=w+1+l*(u+1),C=w+1+l*u;p.push(S,v,C),p.push(v,R,C)}this.setIndex(p),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Hn=class i extends ot{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new E,f=new E,p=[],g=[],x=[],m=[];for(let u=0;u<=n;u++){let w=[],S=u/n,v=0;u===0&&a===0?v=.5/t:u===n&&c===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){let C=R/t;d.x=-e*Math.cos(s+C*r)*Math.sin(a+S*o),d.y=e*Math.cos(a+S*o),d.z=e*Math.sin(s+C*r)*Math.sin(a+S*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(C+v,1-S),w.push(l++)}h.push(w)}for(let u=0;u<n;u++)for(let w=0;w<t;w++){let S=h[u][w+1],v=h[u][w],R=h[u+1][w],C=h[u+1][w+1];(u!==0||a>0)&&p.push(S,v,C),(u!==n-1||c<Math.PI)&&p.push(v,R,C)}this.setIndex(p),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var js=class i extends ot{constructor(e=new Js(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new E,c=new E,l=new fe,h=new E,d=[],f=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(p,2));function x(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),w(),u()}function m(S){h=e.getPointAt(S/t,h);let v=a.normals[S],R=a.binormals[S];for(let C=0;C<=s;C++){let P=C/s*Math.PI*2,N=Math.sin(P),b=-Math.cos(P);c.x=b*v.x+N*R.x,c.y=b*v.y+N*R.y,c.z=b*v.z+N*R.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function u(){for(let S=1;S<=t;S++)for(let v=1;v<=s;v++){let R=(s+1)*(S-1)+(v-1),C=(s+1)*S+(v-1),P=(s+1)*S+v,N=(s+1)*(S-1)+v;g.push(R,C,N),g.push(C,P,N)}}function w(){for(let S=0;S<=t;S++)for(let v=0;v<=s;v++)l.x=S/t,l.y=v/s,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Z0[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var la=class extends Vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ca=class extends Vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function kr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function K0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ti=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ha=class extends Ti{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cl,endingEnd:cl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hl:r=e,o=2*t-n;break;case ul:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case hl:a=e,c=2*n-t;break;case ul:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,u=-f*m+2*f*x-f*g,w=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,S=(-1-p)*m+(1.5+p)*x+.5*g,v=p*m-p*x;for(let R=0;R!==o;++R)r[R]=u*a[h+R]+w*a[l+R]+S*a[c+R]+v*a[d+R];return r}},ua=class extends Ti{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),d=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*h;return r}},da=class extends Ti{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},en=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=kr(t,this.TimeBufferType),this.values=kr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:kr(e.times,Array),values:kr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ha(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fs:t=this.InterpolantFactoryMethodDiscrete;break;case Xr:t=this.InterpolantFactoryMethodLinear;break;case Vr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fs;case this.InterpolantFactoryMethodLinear:return Xr;case this.InterpolantFactoryMethodSmooth:return Vr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&K0(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Vr,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,f=d-n,p=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[f+g]||x!==t[p+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let p=0;p!==n;++p)t[f+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};en.prototype.ValueTypeName="";en.prototype.TimeBufferType=Float32Array;en.prototype.ValueBufferType=Float32Array;en.prototype.DefaultInterpolation=Xr;var si=class extends en{constructor(e,t,n){super(e,t,n)}};si.prototype.ValueTypeName="bool";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=Fs;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var fa=class extends en{constructor(e,t,n,s){super(e,t,n,s)}};fa.prototype.ValueTypeName="color";var pa=class extends en{constructor(e,t,n,s){super(e,t,n,s)}};pa.prototype.ValueTypeName="number";var ma=class extends Ti{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)Qt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Qs=class extends en{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ma(this.times,this.values,this.getValueSize(),e)}};Qs.prototype.ValueTypeName="quaternion";Qs.prototype.InterpolantFactoryMethodSmooth=void 0;var ri=class extends en{constructor(e,t,n){super(e,t,n)}};ri.prototype.ValueTypeName="string";ri.prototype.ValueBufferType=Array;ri.prototype.DefaultInterpolation=Fs;ri.prototype.InterpolantFactoryMethodLinear=void 0;ri.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends en{constructor(e,t,n,s){super(e,t,n,s)}};ga.prototype.ValueTypeName="vector";var _a=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=l.length;d<f;d+=2){let p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Gh=new _a,xa=class{constructor(e){this.manager=e!==void 0?e:Gh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};xa.DEFAULT_MATERIAL_NAME="__DEFAULT";var ya=class extends Hs{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var va=class extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ol="\\[\\]\\.:\\/",$0=new RegExp("["+Ol+"]","g"),Bl="[^"+Ol+"]",J0="[^"+Ol.replace("\\.","")+"]",j0=/((?:WC+[\/:])*)/.source.replace("WC",Bl),Q0=/(WCOD+)?/.source.replace("WCOD",J0),ed=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bl),td=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bl),nd=new RegExp("^"+j0+Q0+ed+td+"$"),id=["material","materials","bones","map"],ml=class{constructor(e,t,n){let s=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},at=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($0,"")}static parseTrackName(e){let t=nd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);id.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};at.Composite=ml;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var k2=new Float32Array(1);var $c=new Ke,er=class{constructor(e,t,n=0,s=1/0){this.ray=new kn(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ns,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return $c.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($c),this}intersectObject(e,t=!0,n=[]){return gl(e,this,n,t),n.sort(Jc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)gl(e[s],this,n,t);return n.sort(Jc),n}};function Jc(i,e){return i.distance-e.distance}function gl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)gl(r[a],e,t,!0)}}var ls=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Be(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Be(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var tr=class extends Mn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function zl(i,e,t,n){let s=sd(n);switch(t){case Al:return i*e;case Fa:return i*e/s.components*s.byteLength;case Oa:return i*e/s.components*s.byteLength;case Rl:return i*e*2/s.components*s.byteLength;case Ba:return i*e*2/s.components*s.byteLength;case Cl:return i*e*3/s.components*s.byteLength;case hn:return i*e*4/s.components*s.byteLength;case za:return i*e*4/s.components*s.byteLength;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ar:case or:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:case Ha:return Math.max(i,16)*Math.max(e,8)/4;case ka:case Ga:return Math.max(i,8)*Math.max(e,8)/2;case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case $a:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case eo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case to:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case no:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case io:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ro:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ao:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case oo:case lo:case co:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ho:case uo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case fo:case po:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sd(i){switch(i){case Cn:case Sl:return{byteLength:1,components:1};case cs:case Tl:case hs:return{byteLength:2,components:1};case Ua:case Na:return{byteLength:2,components:4};case ci:case Da:case _n:return{byteLength:4,components:1};case wl:case El:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function du(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function cd(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){let g=d[f],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){let x=d[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var hd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ud=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,md=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_d=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Md=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Sd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Td=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ld=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Dd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Nd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,nf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,df=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ff=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ef=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Af=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Rf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,If=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Df=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Of=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,kf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ep=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,np=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ip=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,sp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,hp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,up=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_p=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ep=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ap=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Rp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ip=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Np=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Op=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:hd,alphahash_pars_fragment:ud,alphamap_fragment:dd,alphamap_pars_fragment:fd,alphatest_fragment:pd,alphatest_pars_fragment:md,aomap_fragment:gd,aomap_pars_fragment:_d,batching_pars_vertex:xd,batching_vertex:yd,begin_vertex:vd,beginnormal_vertex:Md,bsdfs:bd,iridescence_fragment:Sd,bumpmap_pars_fragment:Td,clipping_planes_fragment:wd,clipping_planes_pars_fragment:Ed,clipping_planes_pars_vertex:Ad,clipping_planes_vertex:Cd,color_fragment:Rd,color_pars_fragment:Pd,color_pars_vertex:Id,color_vertex:Ld,common:Dd,cube_uv_reflection_fragment:Ud,defaultnormal_vertex:Nd,displacementmap_pars_vertex:Fd,displacementmap_vertex:Od,emissivemap_fragment:Bd,emissivemap_pars_fragment:zd,colorspace_fragment:kd,colorspace_pars_fragment:Vd,envmap_fragment:Gd,envmap_common_pars_fragment:Hd,envmap_pars_fragment:Wd,envmap_pars_vertex:Xd,envmap_physical_pars_fragment:nf,envmap_vertex:qd,fog_vertex:Yd,fog_pars_vertex:Zd,fog_fragment:Kd,fog_pars_fragment:$d,gradientmap_pars_fragment:Jd,lightmap_pars_fragment:jd,lights_lambert_fragment:Qd,lights_lambert_pars_fragment:ef,lights_pars_begin:tf,lights_toon_fragment:sf,lights_toon_pars_fragment:rf,lights_phong_fragment:af,lights_phong_pars_fragment:of,lights_physical_fragment:lf,lights_physical_pars_fragment:cf,lights_fragment_begin:hf,lights_fragment_maps:uf,lights_fragment_end:df,logdepthbuf_fragment:ff,logdepthbuf_pars_fragment:pf,logdepthbuf_pars_vertex:mf,logdepthbuf_vertex:gf,map_fragment:_f,map_pars_fragment:xf,map_particle_fragment:yf,map_particle_pars_fragment:vf,metalnessmap_fragment:Mf,metalnessmap_pars_fragment:bf,morphinstance_vertex:Sf,morphcolor_vertex:Tf,morphnormal_vertex:wf,morphtarget_pars_vertex:Ef,morphtarget_vertex:Af,normal_fragment_begin:Cf,normal_fragment_maps:Rf,normal_pars_fragment:Pf,normal_pars_vertex:If,normal_vertex:Lf,normalmap_pars_fragment:Df,clearcoat_normal_fragment_begin:Uf,clearcoat_normal_fragment_maps:Nf,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:Of,opaque_fragment:Bf,packing:zf,premultiplied_alpha_fragment:kf,project_vertex:Vf,dithering_fragment:Gf,dithering_pars_fragment:Hf,roughnessmap_fragment:Wf,roughnessmap_pars_fragment:Xf,shadowmap_pars_fragment:qf,shadowmap_pars_vertex:Yf,shadowmap_vertex:Zf,shadowmask_pars_fragment:Kf,skinbase_vertex:$f,skinning_pars_vertex:Jf,skinning_vertex:jf,skinnormal_vertex:Qf,specularmap_fragment:ep,specularmap_pars_fragment:tp,tonemapping_fragment:np,tonemapping_pars_fragment:ip,transmission_fragment:sp,transmission_pars_fragment:rp,uv_pars_fragment:ap,uv_pars_vertex:op,uv_vertex:lp,worldpos_vertex:cp,background_vert:hp,background_frag:up,backgroundCube_vert:dp,backgroundCube_frag:fp,cube_vert:pp,cube_frag:mp,depth_vert:gp,depth_frag:_p,distanceRGBA_vert:xp,distanceRGBA_frag:yp,equirect_vert:vp,equirect_frag:Mp,linedashed_vert:bp,linedashed_frag:Sp,meshbasic_vert:Tp,meshbasic_frag:wp,meshlambert_vert:Ep,meshlambert_frag:Ap,meshmatcap_vert:Cp,meshmatcap_frag:Rp,meshnormal_vert:Pp,meshnormal_frag:Ip,meshphong_vert:Lp,meshphong_frag:Dp,meshphysical_vert:Up,meshphysical_frag:Np,meshtoon_vert:Fp,meshtoon_frag:Op,points_vert:Bp,points_frag:zp,shadow_vert:kp,shadow_frag:Vp,sprite_vert:Gp,sprite_frag:Hp},re={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},Rn={basic:{uniforms:Bt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Bt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Fe(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Bt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Bt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Bt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Fe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Bt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Bt([re.points,re.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Bt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Bt([re.common,re.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Bt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Bt([re.sprite,re.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Bt([re.common,re.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Bt([re.lights,re.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Rn.physical={uniforms:Bt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};var mo={r:0,b:0,g:0},Ci=new Tn,Wp=new Ke;function Xp(i,e,t,n,s,r,a){let o=new Fe(0),c=r===!0?0:1,l,h,d=null,f=0,p=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function x(S){let v=!1,R=g(S);R===null?u(o,c):R&&R.isColor&&(u(R,1),v=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,v){let R=g(v);R&&(R.isCubeTexture||R.mapping===nr)?(h===void 0&&(h=new ft(new is(1,1,1),new vt({name:"BackgroundCubeMaterial",uniforms:Ai(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ci.copy(v.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Wp.makeRotationFromEuler(Ci)),h.material.toneMapped=He.getTransfer(R.colorSpace)!==Ze,(d!==R||f!==R.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=R,f=R.version,p=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new ft(new Si(2,2),new vt({name:"BackgroundMaterial",uniforms:Ai(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=He.getTransfer(R.colorSpace)!==Ze,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||f!==R.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=R,f=R.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function u(S,v){S.getRGB(mo,Nl(i)),n.buffers.color.setClear(mo.r,mo.g,mo.b,v,a)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),c=v,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,u(o,c)},render:x,addToRenderList:m,dispose:w}}function qp(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(M,L,z,H,q){let K=!1,X=d(H,z,L);r!==X&&(r=X,l(r.object)),K=p(M,H,z,q),K&&g(M,H,z,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,v(M,L,z,H),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,L,z){let H=z.wireframe===!0,q=n[M.id];q===void 0&&(q={},n[M.id]=q);let K=q[L.id];K===void 0&&(K={},q[L.id]=K);let X=K[H];return X===void 0&&(X=f(c()),K[H]=X),X}function f(M){let L=[],z=[],H=[];for(let q=0;q<t;q++)L[q]=0,z[q]=0,H[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:H,object:M,attributes:{},index:null}}function p(M,L,z,H){let q=r.attributes,K=L.attributes,X=0,ne=z.getAttributes();for(let V in ne)if(ne[V].location>=0){let he=q[V],Te=K[V];if(Te===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(Te=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(Te=M.instanceColor)),he===void 0||he.attribute!==Te||Te&&he.data!==Te.data)return!0;X++}return r.attributesNum!==X||r.index!==H}function g(M,L,z,H){let q={},K=L.attributes,X=0,ne=z.getAttributes();for(let V in ne)if(ne[V].location>=0){let he=K[V];he===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));let Te={};Te.attribute=he,he&&he.data&&(Te.data=he.data),q[V]=Te,X++}r.attributes=q,r.attributesNum=X,r.index=H}function x(){let M=r.newAttributes;for(let L=0,z=M.length;L<z;L++)M[L]=0}function m(M){u(M,0)}function u(M,L){let z=r.newAttributes,H=r.enabledAttributes,q=r.attributeDivisors;z[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),q[M]!==L&&(i.vertexAttribDivisor(M,L),q[M]=L)}function w(){let M=r.newAttributes,L=r.enabledAttributes;for(let z=0,H=L.length;z<H;z++)L[z]!==M[z]&&(i.disableVertexAttribArray(z),L[z]=0)}function S(M,L,z,H,q,K,X){X===!0?i.vertexAttribIPointer(M,L,z,q,K):i.vertexAttribPointer(M,L,z,H,q,K)}function v(M,L,z,H){x();let q=H.attributes,K=z.getAttributes(),X=L.defaultAttributeValues;for(let ne in K){let V=K[ne];if(V.location>=0){let ae=q[ne];if(ae===void 0&&(ne==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),ne==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),ae!==void 0){let he=ae.normalized,Te=ae.itemSize,ke=e.get(ae);if(ke===void 0)continue;let tt=ke.buffer,lt=ke.type,qe=ke.bytesPerElement,Y=lt===i.INT||lt===i.UNSIGNED_INT||ae.gpuType===Da;if(ae.isInterleavedBufferAttribute){let J=ae.data,pe=J.stride,Le=ae.offset;if(J.isInstancedInterleavedBuffer){for(let Se=0;Se<V.locationSize;Se++)u(V.location+Se,J.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Se=0;Se<V.locationSize;Se++)m(V.location+Se);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Se=0;Se<V.locationSize;Se++)S(V.location+Se,Te/V.locationSize,lt,he,pe*qe,(Le+Te/V.locationSize*Se)*qe,Y)}else{if(ae.isInstancedBufferAttribute){for(let J=0;J<V.locationSize;J++)u(V.location+J,ae.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let J=0;J<V.locationSize;J++)m(V.location+J);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let J=0;J<V.locationSize;J++)S(V.location+J,Te/V.locationSize,lt,he,Te*qe,Te/V.locationSize*J*qe,Y)}}else if(X!==void 0){let he=X[ne];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(V.location,he);break;case 3:i.vertexAttrib3fv(V.location,he);break;case 4:i.vertexAttrib4fv(V.location,he);break;default:i.vertexAttrib1fv(V.location,he)}}}}w()}function R(){N();for(let M in n){let L=n[M];for(let z in L){let H=L[z];for(let q in H)h(H[q].object),delete H[q];delete L[z]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;let L=n[M.id];for(let z in L){let H=L[z];for(let q in H)h(H[q].object),delete H[q];delete L[z]}delete n[M.id]}function P(M){for(let L in n){let z=n[L];if(z[M.id]===void 0)continue;let H=z[M.id];for(let q in H)h(H[q].object),delete H[q];delete z[M.id]}}function N(){b(),a=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:w}}function Yp(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];t.update(p,n,1)}function c(l,h,d,f){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Zp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==hn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let N=P===hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Cn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==_n&&!N)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:R,maxSamples:C}}function Kp(i){let e=this,t=null,n=0,s=!1,r=!1,a=new an,o=new Ie,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||n!==0||s;return s=f,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,p){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let w=r?0:n,S=w*4,v=u.clippingState||null;c.value=v,v=h(g,f,S,p);for(let R=0;R!==S;++R)v[R]=t[R];u.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,p,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let u=p+x*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<u)&&(m=new Float32Array(u));for(let S=0,v=p;S!==x;++S,v+=4)a.copy(d[S]).applyMatrix4(w,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function $p(i){let e=new WeakMap;function t(a,o){return o===Pa?a.mapping=wi:o===Ia&&(a.mapping=Ei),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Pa||o===Ia)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new $r(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var ms=4,Hh=[.125,.215,.35,.446,.526,.582],Ii=20,kl=new ya,Wh=new Fe,Vl=null,Gl=0,Hl=0,Wl=!1,Pi=(1+Math.sqrt(5))/2,ps=1/Pi,Xh=[new E(-Pi,ps,0),new E(Pi,ps,0),new E(-ps,0,Pi),new E(ps,0,Pi),new E(0,Pi,-ps),new E(0,Pi,ps),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],Jp=new E,xo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Jp}=r;Vl=this._renderer.getRenderTarget(),Gl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vl,Gl,Hl),this._renderer.xr.enabled=Wl,e.scissorTest=!1,go(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===Ei?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vl=this._renderer.getRenderTarget(),Gl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:hs,format:hn,colorSpace:Mi,depthBuffer:!1},s=qh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qh(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jp(r)),this._blurMaterial=Qp(r,e,t)}return s}_compileMaterial(e){let t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,kl)}_sceneToCubeUV(e,t,n,s,r){let c=new Ft(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Wh),d.toneMapping=Xn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let x=new wn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),m=new ft(new is,x),u=!1,w=e.background;w?w.isColor&&(x.color.copy(w),e.background=null,u=!0):(x.color.copy(Wh),u=!0);for(let S=0;S<6;S++){let v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));let R=this._cubeSize;go(s,v*R,S>2?R:0,R,R),d.setRenderTarget(s),u&&d.render(m,c),d.render(e,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===wi||e.mapping===Ei;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ft(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;go(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,kl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Xh[(s-r-1)%Xh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new ft(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ii-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ii;m>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ii}`);let u=[],w=0;for(let P=0;P<Ii;++P){let N=P/x,b=Math.exp(-N*N/2);u.push(b),P===0?w+=b:P<m&&(w+=2*b)}for(let P=0;P<u.length;P++)u[P]=u[P]/w;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;let v=this._sizeLods[s],R=3*v*(s>S-ms?s-S+ms:0),C=4*(this._cubeSize-v);go(t,R,C,3*v,2*v),c.setRenderTarget(t),c.render(d,kl)}};function jp(i){let e=[],t=[],n=[],s=i,r=i-ms+1+Hh.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let c=1/o;a>i-ms?c=Hh[a-i+ms-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,d=1+l,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,u=1,w=new Float32Array(x*g*p),S=new Float32Array(m*g*p),v=new Float32Array(u*g*p);for(let C=0;C<p;C++){let P=C%3*2/3-1,N=C>2?0:-1,b=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];w.set(b,x*g*C),S.set(f,m*g*C);let M=[C,C,C,C,C,C];v.set(M,u*g*C)}let R=new ot;R.setAttribute("position",new It(w,x)),R.setAttribute("uv",new It(S,m)),R.setAttribute("faceIndex",new It(v,u)),e.push(R),s>ms&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qh(i,e,t){let n=new bn(i,e,t);return n.texture.mapping=nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function go(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Qp(i,e,t){let n=new Float32Array(Ii),s=new E(0,1,0);return new vt({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Yh(){return new vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Zh(){return new vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function ec(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function e1(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===Pa||c===Ia,h=c===wi||c===Ei;if(l||h){let d=e.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new xo(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new xo(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function t1(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&es("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function n1(i,e,t,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let p in f)e.update(f[p],i.ARRAY_BUFFER)}function l(d){let f=[],p=d.index,g=d.attributes.position,x=0;if(p!==null){let w=p.array;x=p.version;for(let S=0,v=w.length;S<v;S+=3){let R=w[S+0],C=w[S+1],P=w[S+2];f.push(R,C,C,P,P,R)}}else if(g!==void 0){let w=g.array;x=g.version;for(let S=0,v=w.length/3-1;S<v;S+=3){let R=S+0,C=S+1,P=S+2;f.push(R,C,C,P,P,R)}}else return;let m=new(Ul(f)?Gs:Vs)(f,1);m.version=x;let u=r.get(d);u&&e.remove(u),r.set(d,m)}function h(d){let f=r.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function i1(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*a),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*a,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];t.update(m,n,1)}function d(f,p,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)l(f[u]/a,p[u],x[u]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,g);let u=0;for(let w=0;w<g;w++)u+=p[w]*x[w];t.update(u,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function s1(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function r1(i,e,t){let n=new WeakMap,s=new st;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==d){let b=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],S=0;p===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let v=o.attributes.position.count*S,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let C=new Float32Array(v*R*4*d),P=new ks(C,v,R,d);P.type=_n,P.needsUpdate=!0;let N=S*4;for(let M=0;M<d;M++){let L=m[M],z=u[M],H=w[M],q=v*R*4*M;for(let K=0;K<L.count;K++){let X=K*N;p===!0&&(s.fromBufferAttribute(L,K),C[q+X+0]=s.x,C[q+X+1]=s.y,C[q+X+2]=s.z,C[q+X+3]=0),g===!0&&(s.fromBufferAttribute(z,K),C[q+X+4]=s.x,C[q+X+5]=s.y,C[q+X+6]=s.z,C[q+X+7]=0),x===!0&&(s.fromBufferAttribute(H,K),C[q+X+8]=s.x,C[q+X+9]=s.y,C[q+X+10]=s.z,C[q+X+11]=H.itemSize===4?s.w:1)}}f={count:d,texture:P,size:new fe(v,R)},n.set(o,f),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function a1(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var fu=new Xt,Kh=new Zs(1,1),pu=new ks,mu=new Zr,gu=new Ws,$h=[],Jh=[],jh=new Float32Array(16),Qh=new Float32Array(9),eu=new Float32Array(4);function _s(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=$h[s];if(r===void 0&&(r=new Float32Array(s),$h[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function vo(i,e){let t=Jh[e];t===void 0&&(t=new Int32Array(e),Jh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function o1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function l1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function c1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function h1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function u1(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;eu.set(n),i.uniformMatrix2fv(this.addr,!1,eu),Et(t,n)}}function d1(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;Qh.set(n),i.uniformMatrix3fv(this.addr,!1,Qh),Et(t,n)}}function f1(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;jh.set(n),i.uniformMatrix4fv(this.addr,!1,jh),Et(t,n)}}function p1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function m1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function g1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function _1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function x1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function y1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function v1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function M1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function b1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Kh.compareFunction=Pl,r=Kh):r=fu,t.setTexture2D(e||r,s)}function S1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||mu,s)}function T1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||gu,s)}function w1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||pu,s)}function E1(i){switch(i){case 5126:return o1;case 35664:return l1;case 35665:return c1;case 35666:return h1;case 35674:return u1;case 35675:return d1;case 35676:return f1;case 5124:case 35670:return p1;case 35667:case 35671:return m1;case 35668:case 35672:return g1;case 35669:case 35673:return _1;case 5125:return x1;case 36294:return y1;case 36295:return v1;case 36296:return M1;case 35678:case 36198:case 36298:case 36306:case 35682:return b1;case 35679:case 36299:case 36307:return S1;case 35680:case 36300:case 36308:case 36293:return T1;case 36289:case 36303:case 36311:case 36292:return w1}}function A1(i,e){i.uniform1fv(this.addr,e)}function C1(i,e){let t=_s(e,this.size,2);i.uniform2fv(this.addr,t)}function R1(i,e){let t=_s(e,this.size,3);i.uniform3fv(this.addr,t)}function P1(i,e){let t=_s(e,this.size,4);i.uniform4fv(this.addr,t)}function I1(i,e){let t=_s(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function L1(i,e){let t=_s(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function D1(i,e){let t=_s(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function U1(i,e){i.uniform1iv(this.addr,e)}function N1(i,e){i.uniform2iv(this.addr,e)}function F1(i,e){i.uniform3iv(this.addr,e)}function O1(i,e){i.uniform4iv(this.addr,e)}function B1(i,e){i.uniform1uiv(this.addr,e)}function z1(i,e){i.uniform2uiv(this.addr,e)}function k1(i,e){i.uniform3uiv(this.addr,e)}function V1(i,e){i.uniform4uiv(this.addr,e)}function G1(i,e,t){let n=this.cache,s=e.length,r=vo(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||fu,r[a])}function H1(i,e,t){let n=this.cache,s=e.length,r=vo(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||mu,r[a])}function W1(i,e,t){let n=this.cache,s=e.length,r=vo(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||gu,r[a])}function X1(i,e,t){let n=this.cache,s=e.length,r=vo(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||pu,r[a])}function q1(i){switch(i){case 5126:return A1;case 35664:return C1;case 35665:return R1;case 35666:return P1;case 35674:return I1;case 35675:return L1;case 35676:return D1;case 5124:case 35670:return U1;case 35667:case 35671:return N1;case 35668:case 35672:return F1;case 35669:case 35673:return O1;case 5125:return B1;case 36294:return z1;case 36295:return k1;case 36296:return V1;case 35678:case 36198:case 36298:case 36306:case 35682:return G1;case 35679:case 36299:case 36307:return H1;case 35680:case 36300:case 36308:case 36293:return W1;case 36289:case 36303:case 36311:case 36292:return X1}}var ql=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=E1(t.type)}},Yl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q1(t.type)}},Zl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Xl=/(\w+)(\])?(\[|\.)?/g;function tu(i,e){i.seq.push(e),i.map[e.id]=e}function Y1(i,e,t){let n=i.name,s=n.length;for(Xl.lastIndex=0;;){let r=Xl.exec(n),a=Xl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){tu(t,l===void 0?new ql(o,i,e):new Yl(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Zl(o),tu(t,d)),t=d}}}var gs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Y1(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function nu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Z1=37297,K1=0;function $1(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var iu=new Ie;function J1(i){He._getMatrix(iu,He.workingColorSpace,i);let e=`mat3( ${iu.elements.map(t=>t.toFixed(4))} )`;switch(He.getTransfer(i)){case Os:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function su(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+$1(i.getShaderSource(e),o)}else return r}function j1(i,e){let t=J1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Q1(i,e){let t;switch(e){case yh:t="Linear";break;case vh:t="Reinhard";break;case Mh:t="Cineon";break;case bh:t="ACESFilmic";break;case Th:t="AgX";break;case wh:t="Neutral";break;case Sh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var _o=new E;function em(){He.getLuminanceCoefficients(_o);let i=_o.x.toFixed(4),e=_o.y.toFixed(4),t=_o.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function nm(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function im(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function lr(i){return i!==""}function ru(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function au(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var sm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kl(i){return i.replace(sm,am)}var rm=new Map;function am(i,e){let t=ze[e];if(t===void 0){let n=rm.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Kl(t)}var om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ou(i){return i.replace(om,lm)}function lm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===xl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===eh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===An&&(e="SHADOWMAP_TYPE_VSM"),e}function hm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case wi:case Ei:e="ENVMAP_TYPE_CUBE";break;case nr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function um(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ei:e="ENVMAP_MODE_REFRACTION";break}return e}function dm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ml:e="ENVMAP_BLENDING_MULTIPLY";break;case _h:e="ENVMAP_BLENDING_MIX";break;case xh:e="ENVMAP_BLENDING_ADD";break}return e}function fm(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function pm(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=cm(t),l=hm(t),h=um(t),d=dm(t),f=fm(t),p=tm(t),g=nm(r),x=s.createProgram(),m,u,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),u.length>0&&(u+=`
`)):(m=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),u=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Xn?Q1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,j1("linearToOutputTexel",t.outputColorSpace),em(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),a=Kl(a),a=ru(a,t),a=au(a,t),o=Kl(o),o=ru(o,t),o=au(o,t),a=ou(a),o=ou(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===Il?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let S=w+m+a,v=w+u+o,R=nu(s,s.VERTEX_SHADER,S),C=nu(s,s.FRAGMENT_SHADER,v);s.attachShader(x,R),s.attachShader(x,C),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(L){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(x)||"",H=s.getShaderInfoLog(R)||"",q=s.getShaderInfoLog(C)||"",K=z.trim(),X=H.trim(),ne=q.trim(),V=!0,ae=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,R,C);else{let he=su(s,R,"vertex"),Te=su(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+K+`
`+he+`
`+Te)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(X===""||ne==="")&&(ae=!1);ae&&(L.diagnostics={runnable:V,programLog:K,vertexShader:{log:X,prefix:m},fragmentShader:{log:ne,prefix:u}})}s.deleteShader(R),s.deleteShader(C),N=new gs(s,x),b=im(s,x)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,Z1)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=K1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=C,this}var mm=0,$l=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Jl(e),t.set(e,n)),n}},Jl=class{constructor(e){this.id=mm++,this.code=e,this.usedTimes=0}};function gm(i,e,t,n,s,r,a){let o=new ns,c=new $l,l=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,L,z,H){let q=z.fog,K=H.geometry,X=b.isMeshStandardMaterial?z.environment:null,ne=(b.isMeshStandardMaterial?t:e).get(b.envMap||X),V=ne&&ne.mapping===nr?ne.image.height:null,ae=g[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let he=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Te=he!==void 0?he.length:0,ke=0;K.morphAttributes.position!==void 0&&(ke=1),K.morphAttributes.normal!==void 0&&(ke=2),K.morphAttributes.color!==void 0&&(ke=3);let tt,lt,qe,Y;if(ae){let Ye=Rn[ae];tt=Ye.vertexShader,lt=Ye.fragmentShader}else tt=b.vertexShader,lt=b.fragmentShader,c.update(b),qe=c.getVertexShaderID(b),Y=c.getFragmentShaderID(b);let J=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),Le=H.isInstancedMesh===!0,Se=H.isBatchedMesh===!0,Ge=!!b.map,Lt=!!b.matcap,A=!!ne,ct=!!b.aoMap,Ue=!!b.lightMap,Re=!!b.bumpMap,_e=!!b.normalMap,ht=!!b.displacementMap,xe=!!b.emissiveMap,Oe=!!b.metalnessMap,Ct=!!b.roughnessMap,_t=b.anisotropy>0,T=b.clearcoat>0,_=b.dispersion>0,F=b.iridescence>0,W=b.sheen>0,$=b.transmission>0,G=_t&&!!b.anisotropyMap,be=T&&!!b.clearcoatMap,ie=T&&!!b.clearcoatNormalMap,ye=T&&!!b.clearcoatRoughnessMap,ve=F&&!!b.iridescenceMap,ee=F&&!!b.iridescenceThicknessMap,ce=W&&!!b.sheenColorMap,Ce=W&&!!b.sheenRoughnessMap,Me=!!b.specularMap,oe=!!b.specularColorMap,Ne=!!b.specularIntensityMap,I=$&&!!b.transmissionMap,te=$&&!!b.thicknessMap,se=!!b.gradientMap,de=!!b.alphaMap,j=b.alphaTest>0,Z=!!b.alphaHash,ge=!!b.extensions,De=Xn;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(De=i.toneMapping);let nt={shaderID:ae,shaderType:b.type,shaderName:b.name,vertexShader:tt,fragmentShader:lt,defines:b.defines,customVertexShaderID:qe,customFragmentShaderID:Y,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Se,batchingColor:Se&&H._colorsTexture!==null,instancing:Le,instancingColor:Le&&H.instanceColor!==null,instancingMorph:Le&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Mi,alphaToCoverage:!!b.alphaToCoverage,map:Ge,matcap:Lt,envMap:A,envMapMode:A&&ne.mapping,envMapCubeUVHeight:V,aoMap:ct,lightMap:Ue,bumpMap:Re,normalMap:_e,displacementMap:f&&ht,emissiveMap:xe,normalMapObjectSpace:_e&&b.normalMapType===Ph,normalMapTangentSpace:_e&&b.normalMapType===Rh,metalnessMap:Oe,roughnessMap:Ct,anisotropy:_t,anisotropyMap:G,clearcoat:T,clearcoatMap:be,clearcoatNormalMap:ie,clearcoatRoughnessMap:ye,dispersion:_,iridescence:F,iridescenceMap:ve,iridescenceThicknessMap:ee,sheen:W,sheenColorMap:ce,sheenRoughnessMap:Ce,specularMap:Me,specularColorMap:oe,specularIntensityMap:Ne,transmission:$,transmissionMap:I,thicknessMap:te,gradientMap:se,opaque:b.transparent===!1&&b.blending===yi&&b.alphaToCoverage===!1,alphaMap:de,alphaTest:j,alphaHash:Z,combine:b.combine,mapUv:Ge&&x(b.map.channel),aoMapUv:ct&&x(b.aoMap.channel),lightMapUv:Ue&&x(b.lightMap.channel),bumpMapUv:Re&&x(b.bumpMap.channel),normalMapUv:_e&&x(b.normalMap.channel),displacementMapUv:ht&&x(b.displacementMap.channel),emissiveMapUv:xe&&x(b.emissiveMap.channel),metalnessMapUv:Oe&&x(b.metalnessMap.channel),roughnessMapUv:Ct&&x(b.roughnessMap.channel),anisotropyMapUv:G&&x(b.anisotropyMap.channel),clearcoatMapUv:be&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:ie&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&x(b.sheenRoughnessMap.channel),specularMapUv:Me&&x(b.specularMap.channel),specularColorMapUv:oe&&x(b.specularColorMap.channel),specularIntensityMapUv:Ne&&x(b.specularIntensityMap.channel),transmissionMapUv:I&&x(b.transmissionMap.channel),thicknessMapUv:te&&x(b.thicknessMap.channel),alphaMapUv:de&&x(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(_e||_t),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!K.attributes.uv&&(Ge||de),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:H.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:ke,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:Ge&&b.map.isVideoTexture===!0&&He.getTransfer(b.map.colorSpace)===Ze,decodeVideoTextureEmissive:xe&&b.emissiveMap.isVideoTexture===!0&&He.getTransfer(b.emissiveMap.colorSpace)===Ze,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===cn,flipSided:b.side===Gt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ge&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&b.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return nt.vertexUv1s=l.has(1),nt.vertexUv2s=l.has(2),nt.vertexUv3s=l.has(3),l.clear(),nt}function u(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(w(M,b),S(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function w(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function S(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){let M=g[b.type],L;if(M){let z=Rn[M];L=Vh.clone(z.uniforms)}else L=b.uniforms;return L}function R(b,M){let L;for(let z=0,H=h.length;z<H;z++){let q=h[z];if(q.cacheKey===M){L=q,++L.usedTimes;break}}return L===void 0&&(L=new pm(i,M,b,r),h.push(L)),L}function C(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function P(b){c.remove(b)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:v,acquireProgram:R,releaseProgram:C,releaseShaderCache:P,programs:h,dispose:N}}function _m(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function xm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function cu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,f,p,g,x,m){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=x,u.group=m),e++,u}function o(d,f,p,g,x,m){let u=a(d,f,p,g,x,m);p.transmission>0?n.push(u):p.transparent===!0?s.push(u):t.push(u)}function c(d,f,p,g,x,m){let u=a(d,f,p,g,x,m);p.transmission>0?n.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function l(d,f){t.length>1&&t.sort(d||xm),n.length>1&&n.sort(f||cu),s.length>1&&s.sort(f||cu)}function h(){for(let d=e,f=i.length;d<f;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function ym(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new hu,i.set(n,[a])):s>=r.length?(a=new hu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function vm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Fe};break;case"SpotLight":t={position:new E,direction:new E,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new E,halfWidth:new E,halfHeight:new E};break}return i[e.id]=t,t}}}function Mm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var bm=0;function Sm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tm(i){let e=new vm,t=Mm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new E);let s=new E,r=new Ke,a=new Ke;function o(l){let h=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,x=0,m=0,u=0,w=0,S=0,v=0,R=0,C=0,P=0;l.sort(Sm);for(let b=0,M=l.length;b<M;b++){let L=l[b],z=L.color,H=L.intensity,q=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=z.r*H,d+=z.g*H,f+=z.b*H;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],H);P++}else if(L.isDirectionalLight){let X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let ne=L.shadow,V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=L.shadow.matrix,w++}n.directional[p]=X,p++}else if(L.isSpotLight){let X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(z).multiplyScalar(H),X.distance=q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[x]=X;let ne=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,ne.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[x]=ne.matrix,L.castShadow){let V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=K,v++}x++}else if(L.isRectAreaLight){let X=e.get(L);X.color.copy(z).multiplyScalar(H),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=X,m++}else if(L.isPointLight){let X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let ne=L.shadow,V=t.get(L);V.shadowIntensity=ne.intensity,V.shadowBias=ne.bias,V.shadowNormalBias=ne.normalBias,V.shadowRadius=ne.radius,V.shadowMapSize=ne.mapSize,V.shadowCameraNear=ne.camera.near,V.shadowCameraFar=ne.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=L.shadow.matrix,S++}n.point[g]=X,g++}else if(L.isHemisphereLight){let X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(H),X.groundColor.copy(L.groundColor).multiplyScalar(H),n.hemi[u]=X,u++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==x||N.rectAreaLength!==m||N.hemiLength!==u||N.numDirectionalShadows!==w||N.numPointShadows!==S||N.numSpotShadows!==v||N.numSpotMaps!==R||N.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=P,N.directionalLength=p,N.pointLength=g,N.spotLength=x,N.rectAreaLength=m,N.hemiLength=u,N.numDirectionalShadows=w,N.numPointShadows=S,N.numSpotShadows=v,N.numSpotMaps=R,N.numLightProbes=P,n.version=bm++)}function c(l,h){let d=0,f=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let u=0,w=l.length;u<w;u++){let S=l[u];if(S.isDirectionalLight){let v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(S.isSpotLight){let v=n.spot[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(S.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){let v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function uu(i){let e=new Tm(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function wm(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new uu(i),e.set(s,[o])):r>=a.length?(o=new uu(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Em=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Am=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cm(i,e,t){let n=new Ys,s=new fe,r=new fe,a=new st,o=new la({depthPacking:Ch}),c=new ca,l={},h=t.maxTextureSize,d={[zn]:Gt,[Gt]:zn,[cn]:cn},f=new vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:Em,fragmentShader:Am}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new ot;g.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ft(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xl;let u=this.type;this.render=function(C,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Wn),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let H=u!==An&&this.type===An,q=u===An&&this.type!==An;for(let K=0,X=C.length;K<X;K++){let ne=C[K],V=ne.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let ae=V.getFrameExtents();if(s.multiply(ae),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ae.x),s.x=r.x*ae.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ae.y),s.y=r.y*ae.y,V.mapSize.y=r.y)),V.map===null||H===!0||q===!0){let Te=this.type!==An?{minFilter:Wt,magFilter:Wt}:{};V.map!==null&&V.map.dispose(),V.map=new bn(s.x,s.y,Te),V.map.texture.name=ne.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let he=V.getViewportCount();for(let Te=0;Te<he;Te++){let ke=V.getViewport(Te);a.set(r.x*ke.x,r.y*ke.y,r.x*ke.z,r.y*ke.w),z.viewport(a),V.updateMatrices(ne,Te),n=V.getFrustum(),v(P,N,V.camera,ne,this.type)}V.isPointLightShadow!==!0&&this.type===An&&w(V,N),V.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,L)};function w(C,P){let N=e.update(x);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new bn(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(P,null,N,f,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(P,null,N,p,x,null)}function S(C,P,N,b){let M=null,L=N.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)M=L;else if(M=N.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let z=M.uuid,H=P.uuid,q=l[z];q===void 0&&(q={},l[z]=q);let K=q[H];K===void 0&&(K=M.clone(),q[H]=K,P.addEventListener("dispose",R)),M=K}if(M.visible=P.visible,M.wireframe=P.wireframe,b===An?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:d[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let z=i.properties.get(M);z.light=N}return M}function v(C,P,N,b,M){if(C.visible===!1)return;if(C.layers.test(P.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===An)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,C.matrixWorld);let H=e.update(C),q=C.material;if(Array.isArray(q)){let K=H.groups;for(let X=0,ne=K.length;X<ne;X++){let V=K[X],ae=q[V.materialIndex];if(ae&&ae.visible){let he=S(C,ae,b,M);C.onBeforeShadow(i,C,P,N,H,he,V),i.renderBufferDirect(N,null,H,he,C,V),C.onAfterShadow(i,C,P,N,H,he,V)}}}else if(q.visible){let K=S(C,q,b,M);C.onBeforeShadow(i,C,P,N,H,K,null),i.renderBufferDirect(N,null,H,K,C,null),C.onAfterShadow(i,C,P,N,H,K,null)}}let z=C.children;for(let H=0,q=z.length;H<q;H++)v(z[H],P,N,b,M)}function R(C){C.target.removeEventListener("dispose",R);for(let N in l){let b=l[N],M=C.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var Rm={[Sa]:Ta,[wa]:Ca,[Ea]:Ra,[vi]:Aa,[Ta]:Sa,[Ca]:wa,[Ra]:Ea,[Aa]:vi};function Pm(i,e){function t(){let I=!1,te=new st,se=null,de=new st(0,0,0,0);return{setMask:function(j){se!==j&&!I&&(i.colorMask(j,j,j,j),se=j)},setLocked:function(j){I=j},setClear:function(j,Z,ge,De,nt){nt===!0&&(j*=De,Z*=De,ge*=De),te.set(j,Z,ge,De),de.equals(te)===!1&&(i.clearColor(j,Z,ge,De),de.copy(te))},reset:function(){I=!1,se=null,de.set(-1,0,0,0)}}}function n(){let I=!1,te=!1,se=null,de=null,j=null;return{setReversed:function(Z){if(te!==Z){let ge=e.get("EXT_clip_control");Z?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),te=Z;let De=j;j=null,this.setClear(De)}},getReversed:function(){return te},setTest:function(Z){Z?J(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(Z){se!==Z&&!I&&(i.depthMask(Z),se=Z)},setFunc:function(Z){if(te&&(Z=Rm[Z]),de!==Z){switch(Z){case Sa:i.depthFunc(i.NEVER);break;case Ta:i.depthFunc(i.ALWAYS);break;case wa:i.depthFunc(i.LESS);break;case vi:i.depthFunc(i.LEQUAL);break;case Ea:i.depthFunc(i.EQUAL);break;case Aa:i.depthFunc(i.GEQUAL);break;case Ca:i.depthFunc(i.GREATER);break;case Ra:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=Z}},setLocked:function(Z){I=Z},setClear:function(Z){j!==Z&&(te&&(Z=1-Z),i.clearDepth(Z),j=Z)},reset:function(){I=!1,se=null,de=null,j=null,te=!1}}}function s(){let I=!1,te=null,se=null,de=null,j=null,Z=null,ge=null,De=null,nt=null;return{setTest:function(Ye){I||(Ye?J(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(Ye){te!==Ye&&!I&&(i.stencilMask(Ye),te=Ye)},setFunc:function(Ye,Ln,vn){(se!==Ye||de!==Ln||j!==vn)&&(i.stencilFunc(Ye,Ln,vn),se=Ye,de=Ln,j=vn)},setOp:function(Ye,Ln,vn){(Z!==Ye||ge!==Ln||De!==vn)&&(i.stencilOp(Ye,Ln,vn),Z=Ye,ge=Ln,De=vn)},setLocked:function(Ye){I=Ye},setClear:function(Ye){nt!==Ye&&(i.clearStencil(Ye),nt=Ye)},reset:function(){I=!1,te=null,se=null,de=null,j=null,Z=null,ge=null,De=null,nt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,u=null,w=null,S=null,v=null,R=null,C=null,P=new Fe(0,0,0),N=0,b=!1,M=null,L=null,z=null,H=null,q=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,ne=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=ne>=1):V.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=ne>=2);let ae=null,he={},Te=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),tt=new st().fromArray(Te),lt=new st().fromArray(ke);function qe(I,te,se,de){let j=new Uint8Array(4),Z=i.createTexture();i.bindTexture(I,Z),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ge=0;ge<se;ge++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(te,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,j):i.texImage2D(te+ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,j);return Z}let Y={};Y[i.TEXTURE_2D]=qe(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(vi),Re(!1),_e(_l),J(i.CULL_FACE),ct(Wn);function J(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function pe(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Le(I,te){return d[I]!==te?(i.bindFramebuffer(I,te),d[I]=te,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=te),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=te),!0):!1}function Se(I,te){let se=p,de=!1;if(I){se=f.get(te),se===void 0&&(se=[],f.set(te,se));let j=I.textures;if(se.length!==j.length||se[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,ge=j.length;Z<ge;Z++)se[Z]=i.COLOR_ATTACHMENT0+Z;se.length=j.length,de=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,de=!0);de&&i.drawBuffers(se)}function Ge(I){return g!==I?(i.useProgram(I),g=I,!0):!1}let Lt={[ii]:i.FUNC_ADD,[th]:i.FUNC_SUBTRACT,[nh]:i.FUNC_REVERSE_SUBTRACT};Lt[ih]=i.MIN,Lt[sh]=i.MAX;let A={[rh]:i.ZERO,[ba]:i.ONE,[ah]:i.SRC_COLOR,[Gr]:i.SRC_ALPHA,[dh]:i.SRC_ALPHA_SATURATE,[hh]:i.DST_COLOR,[lh]:i.DST_ALPHA,[oh]:i.ONE_MINUS_SRC_COLOR,[Ji]:i.ONE_MINUS_SRC_ALPHA,[uh]:i.ONE_MINUS_DST_COLOR,[ch]:i.ONE_MINUS_DST_ALPHA,[fh]:i.CONSTANT_COLOR,[ph]:i.ONE_MINUS_CONSTANT_COLOR,[mh]:i.CONSTANT_ALPHA,[gh]:i.ONE_MINUS_CONSTANT_ALPHA};function ct(I,te,se,de,j,Z,ge,De,nt,Ye){if(I===Wn){x===!0&&(pe(i.BLEND),x=!1);return}if(x===!1&&(J(i.BLEND),x=!0),I!==Ma){if(I!==m||Ye!==b){if((u!==ii||v!==ii)&&(i.blendEquation(i.FUNC_ADD),u=ii,v=ii),Ye)switch(I){case yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gn:i.blendFunc(i.ONE,i.ONE);break;case yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case vl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case yl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}w=null,S=null,R=null,C=null,P.set(0,0,0),N=0,m=I,b=Ye}return}j=j||te,Z=Z||se,ge=ge||de,(te!==u||j!==v)&&(i.blendEquationSeparate(Lt[te],Lt[j]),u=te,v=j),(se!==w||de!==S||Z!==R||ge!==C)&&(i.blendFuncSeparate(A[se],A[de],A[Z],A[ge]),w=se,S=de,R=Z,C=ge),(De.equals(P)===!1||nt!==N)&&(i.blendColor(De.r,De.g,De.b,nt),P.copy(De),N=nt),m=I,b=!1}function Ue(I,te){I.side===cn?pe(i.CULL_FACE):J(i.CULL_FACE);let se=I.side===Gt;te&&(se=!se),Re(se),I.blending===yi&&I.transparent===!1?ct(Wn):ct(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let de=I.stencilWrite;o.setTest(de),de&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),xe(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Re(I){M!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),M=I)}function _e(I){I!==jc?(J(i.CULL_FACE),I!==L&&(I===_l?i.cullFace(i.BACK):I===Qc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),L=I}function ht(I){I!==z&&(X&&i.lineWidth(I),z=I)}function xe(I,te,se){I?(J(i.POLYGON_OFFSET_FILL),(H!==te||q!==se)&&(i.polygonOffset(te,se),H=te,q=se)):pe(i.POLYGON_OFFSET_FILL)}function Oe(I){I?J(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function Ct(I){I===void 0&&(I=i.TEXTURE0+K-1),ae!==I&&(i.activeTexture(I),ae=I)}function _t(I,te,se){se===void 0&&(ae===null?se=i.TEXTURE0+K-1:se=ae);let de=he[se];de===void 0&&(de={type:void 0,texture:void 0},he[se]=de),(de.type!==I||de.texture!==te)&&(ae!==se&&(i.activeTexture(se),ae=se),i.bindTexture(I,te||Y[I]),de.type=I,de.texture=te)}function T(){let I=he[ae];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ye(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(I){tt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),tt.copy(I))}function Ce(I){lt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),lt.copy(I))}function Me(I,te){let se=l.get(te);se===void 0&&(se=new WeakMap,l.set(te,se));let de=se.get(I);de===void 0&&(de=i.getUniformBlockIndex(te,I.name),se.set(I,de))}function oe(I,te){let de=l.get(te).get(I);c.get(te)!==de&&(i.uniformBlockBinding(te,de,I.__bindingPointIndex),c.set(te,de))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ae=null,he={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,u=null,w=null,S=null,v=null,R=null,C=null,P=new Fe(0,0,0),N=0,b=!1,M=null,L=null,z=null,H=null,q=null,tt.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:pe,bindFramebuffer:Le,drawBuffers:Se,useProgram:Ge,setBlending:ct,setMaterial:Ue,setFlipSided:Re,setCullFace:_e,setLineWidth:ht,setPolygonOffset:xe,setScissorTest:Oe,activeTexture:Ct,bindTexture:_t,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:ve,texImage3D:ee,updateUBOMapping:Me,uniformBlockBinding:oe,texStorage2D:ie,texStorage3D:ye,texSubImage2D:W,texSubImage3D:$,compressedTexSubImage2D:G,compressedTexSubImage3D:be,scissor:ce,viewport:Ce,reset:Ne}}function Im(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new fe,h=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return p?new OffscreenCanvas(T,_):zs("canvas")}function x(T,_,F){let W=1,$=_t(T);if(($.width>F||$.height>F)&&(W=F/Math.max($.width,$.height)),W<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let G=Math.floor(W*$.width),be=Math.floor(W*$.height);d===void 0&&(d=g(G,be));let ie=_?g(G,be):d;return ie.width=G,ie.height=be,ie.getContext("2d").drawImage(T,0,0,G,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+G+"x"+be+")."),ie}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function m(T){return T.generateMipmaps}function u(T){i.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,_,F,W,$=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let G=_;if(_===i.RED&&(F===i.FLOAT&&(G=i.R32F),F===i.HALF_FLOAT&&(G=i.R16F),F===i.UNSIGNED_BYTE&&(G=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.R8UI),F===i.UNSIGNED_SHORT&&(G=i.R16UI),F===i.UNSIGNED_INT&&(G=i.R32UI),F===i.BYTE&&(G=i.R8I),F===i.SHORT&&(G=i.R16I),F===i.INT&&(G=i.R32I)),_===i.RG&&(F===i.FLOAT&&(G=i.RG32F),F===i.HALF_FLOAT&&(G=i.RG16F),F===i.UNSIGNED_BYTE&&(G=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RG8UI),F===i.UNSIGNED_SHORT&&(G=i.RG16UI),F===i.UNSIGNED_INT&&(G=i.RG32UI),F===i.BYTE&&(G=i.RG8I),F===i.SHORT&&(G=i.RG16I),F===i.INT&&(G=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGB8UI),F===i.UNSIGNED_SHORT&&(G=i.RGB16UI),F===i.UNSIGNED_INT&&(G=i.RGB32UI),F===i.BYTE&&(G=i.RGB8I),F===i.SHORT&&(G=i.RGB16I),F===i.INT&&(G=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),F===i.UNSIGNED_INT&&(G=i.RGBA32UI),F===i.BYTE&&(G=i.RGBA8I),F===i.SHORT&&(G=i.RGBA16I),F===i.INT&&(G=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),_===i.RGBA){let be=$?Os:He.getTransfer(W);F===i.FLOAT&&(G=i.RGBA32F),F===i.HALF_FLOAT&&(G=i.RGBA16F),F===i.UNSIGNED_BYTE&&(G=be===Ze?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function v(T,_){let F;return T?_===null||_===ci||_===us?F=i.DEPTH24_STENCIL8:_===_n?F=i.DEPTH32F_STENCIL8:_===cs&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ci||_===us?F=i.DEPTH_COMPONENT24:_===_n?F=i.DEPTH_COMPONENT32F:_===cs&&(F=i.DEPTH_COMPONENT16),F}function R(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Wt&&T.minFilter!==mn?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function C(T){let _=T.target;_.removeEventListener("dispose",C),N(_),_.isVideoTexture&&h.delete(_)}function P(T){let _=T.target;_.removeEventListener("dispose",P),M(_)}function N(T){let _=n.get(T);if(_.__webglInit===void 0)return;let F=T.source,W=f.get(F);if(W){let $=W[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(T),Object.keys(W).length===0&&f.delete(F)}n.remove(T)}function b(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let F=T.source,W=f.get(F);delete W[_.__cacheKey],a.memory.textures--}function M(T){let _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let $=0;$<_.__webglFramebuffer[W].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[W][$]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let F=T.textures;for(let W=0,$=F.length;W<$;W++){let G=n.get(F[W]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),a.memory.textures--),n.remove(F[W])}n.remove(T)}let L=0;function z(){L=0}function H(){let T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function q(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function K(T,_){let F=n.get(T);if(T.isVideoTexture&&Oe(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){let W=T.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,T,_);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function X(T,_){let F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Y(F,T,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function ne(T,_){let F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Y(F,T,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function V(T,_){let F=n.get(T);if(T.version>0&&F.__version!==T.version){J(F,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}let ae={[Hr]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[Wr]:i.MIRRORED_REPEAT},he={[Wt]:i.NEAREST,[Eh]:i.NEAREST_MIPMAP_NEAREST,[ir]:i.NEAREST_MIPMAP_LINEAR,[mn]:i.LINEAR,[La]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},Te={[Ih]:i.NEVER,[Oh]:i.ALWAYS,[Lh]:i.LESS,[Pl]:i.LEQUAL,[Dh]:i.EQUAL,[Fh]:i.GEQUAL,[Uh]:i.GREATER,[Nh]:i.NOTEQUAL};function ke(T,_){if(_.type===_n&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===mn||_.magFilter===La||_.magFilter===ir||_.magFilter===li||_.minFilter===mn||_.minFilter===La||_.minFilter===ir||_.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ae[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ae[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ae[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,he[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,he[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Te[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Wt||_.minFilter!==ir&&_.minFilter!==li||_.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function tt(T,_){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",C));let W=_.source,$=f.get(W);$===void 0&&($={},f.set(W,$));let G=q(_);if(G!==T.__cacheKey){$[G]===void 0&&($[G]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),$[G].usedTimes++;let be=$[T.__cacheKey];be!==void 0&&($[T.__cacheKey].usedTimes--,be.usedTimes===0&&b(_)),T.__cacheKey=G,T.__webglTexture=$[G].texture}return F}function lt(T,_,F){return Math.floor(Math.floor(T/F)/_)}function qe(T,_,F,W){let G=T.updateRanges;if(G.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,W,_.data);else{G.sort((ee,ce)=>ee.start-ce.start);let be=0;for(let ee=1;ee<G.length;ee++){let ce=G[be],Ce=G[ee],Me=ce.start+ce.count,oe=lt(Ce.start,_.width,4),Ne=lt(ce.start,_.width,4);Ce.start<=Me+1&&oe===Ne&&lt(Ce.start+Ce.count-1,_.width,4)===oe?ce.count=Math.max(ce.count,Ce.start+Ce.count-ce.start):(++be,G[be]=Ce)}G.length=be+1;let ie=i.getParameter(i.UNPACK_ROW_LENGTH),ye=i.getParameter(i.UNPACK_SKIP_PIXELS),ve=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ee=0,ce=G.length;ee<ce;ee++){let Ce=G[ee],Me=Math.floor(Ce.start/4),oe=Math.ceil(Ce.count/4),Ne=Me%_.width,I=Math.floor(Me/_.width),te=oe,se=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Ne,I,te,se,F,W,_.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ie),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,ve)}}function Y(T,_,F){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);let $=tt(T,_),G=_.source;t.bindTexture(W,T.__webglTexture,i.TEXTURE0+F);let be=n.get(G);if(G.version!==be.__version||$===!0){t.activeTexture(i.TEXTURE0+F);let ie=He.getPrimaries(He.workingColorSpace),ye=_.colorSpace===qn?null:He.getPrimaries(_.colorSpace),ve=_.colorSpace===qn||ie===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let ee=x(_.image,!1,s.maxTextureSize);ee=Ct(_,ee);let ce=r.convert(_.format,_.colorSpace),Ce=r.convert(_.type),Me=S(_.internalFormat,ce,Ce,_.colorSpace,_.isVideoTexture);ke(W,_);let oe,Ne=_.mipmaps,I=_.isVideoTexture!==!0,te=be.__version===void 0||$===!0,se=G.dataReady,de=R(_,ee);if(_.isDepthTexture)Me=v(_.format===ds,_.type),te&&(I?t.texStorage2D(i.TEXTURE_2D,1,Me,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Me,ee.width,ee.height,0,ce,Ce,null));else if(_.isDataTexture)if(Ne.length>0){I&&te&&t.texStorage2D(i.TEXTURE_2D,de,Me,Ne[0].width,Ne[0].height);for(let j=0,Z=Ne.length;j<Z;j++)oe=Ne[j],I?se&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,Ce,oe.data):t.texImage2D(i.TEXTURE_2D,j,Me,oe.width,oe.height,0,ce,Ce,oe.data);_.generateMipmaps=!1}else I?(te&&t.texStorage2D(i.TEXTURE_2D,de,Me,ee.width,ee.height),se&&qe(_,ee,ce,Ce)):t.texImage2D(i.TEXTURE_2D,0,Me,ee.width,ee.height,0,ce,Ce,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&te&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Me,Ne[0].width,Ne[0].height,ee.depth);for(let j=0,Z=Ne.length;j<Z;j++)if(oe=Ne[j],_.format!==hn)if(ce!==null)if(I){if(se)if(_.layerUpdates.size>0){let ge=zl(oe.width,oe.height,_.format,_.type);for(let De of _.layerUpdates){let nt=oe.data.subarray(De*ge/oe.data.BYTES_PER_ELEMENT,(De+1)*ge/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,De,oe.width,oe.height,1,ce,nt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,ee.depth,ce,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,Me,oe.width,oe.height,ee.depth,0,oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?se&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,ee.depth,ce,Ce,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,j,Me,oe.width,oe.height,ee.depth,0,ce,Ce,oe.data)}else{I&&te&&t.texStorage2D(i.TEXTURE_2D,de,Me,Ne[0].width,Ne[0].height);for(let j=0,Z=Ne.length;j<Z;j++)oe=Ne[j],_.format!==hn?ce!==null?I?se&&t.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,j,Me,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?se&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,oe.width,oe.height,ce,Ce,oe.data):t.texImage2D(i.TEXTURE_2D,j,Me,oe.width,oe.height,0,ce,Ce,oe.data)}else if(_.isDataArrayTexture)if(I){if(te&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Me,ee.width,ee.height,ee.depth),se)if(_.layerUpdates.size>0){let j=zl(ee.width,ee.height,_.format,_.type);for(let Z of _.layerUpdates){let ge=ee.data.subarray(Z*j/ee.data.BYTES_PER_ELEMENT,(Z+1)*j/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,ee.width,ee.height,1,ce,Ce,ge)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ce,Ce,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Me,ee.width,ee.height,ee.depth,0,ce,Ce,ee.data);else if(_.isData3DTexture)I?(te&&t.texStorage3D(i.TEXTURE_3D,de,Me,ee.width,ee.height,ee.depth),se&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ce,Ce,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Me,ee.width,ee.height,ee.depth,0,ce,Ce,ee.data);else if(_.isFramebufferTexture){if(te)if(I)t.texStorage2D(i.TEXTURE_2D,de,Me,ee.width,ee.height);else{let j=ee.width,Z=ee.height;for(let ge=0;ge<de;ge++)t.texImage2D(i.TEXTURE_2D,ge,Me,j,Z,0,ce,Ce,null),j>>=1,Z>>=1}}else if(Ne.length>0){if(I&&te){let j=_t(Ne[0]);t.texStorage2D(i.TEXTURE_2D,de,Me,j.width,j.height)}for(let j=0,Z=Ne.length;j<Z;j++)oe=Ne[j],I?se&&t.texSubImage2D(i.TEXTURE_2D,j,0,0,ce,Ce,oe):t.texImage2D(i.TEXTURE_2D,j,Me,ce,Ce,oe);_.generateMipmaps=!1}else if(I){if(te){let j=_t(ee);t.texStorage2D(i.TEXTURE_2D,de,Me,j.width,j.height)}se&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,Ce,ee)}else t.texImage2D(i.TEXTURE_2D,0,Me,ce,Ce,ee);m(_)&&u(W),be.__version=G.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function J(T,_,F){if(_.image.length!==6)return;let W=tt(T,_),$=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);let G=n.get($);if($.version!==G.__version||W===!0){t.activeTexture(i.TEXTURE0+F);let be=He.getPrimaries(He.workingColorSpace),ie=_.colorSpace===qn?null:He.getPrimaries(_.colorSpace),ye=_.colorSpace===qn||be===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ve=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,ce=[];for(let Z=0;Z<6;Z++)!ve&&!ee?ce[Z]=x(_.image[Z],!0,s.maxCubemapSize):ce[Z]=ee?_.image[Z].image:_.image[Z],ce[Z]=Ct(_,ce[Z]);let Ce=ce[0],Me=r.convert(_.format,_.colorSpace),oe=r.convert(_.type),Ne=S(_.internalFormat,Me,oe,_.colorSpace),I=_.isVideoTexture!==!0,te=G.__version===void 0||W===!0,se=$.dataReady,de=R(_,Ce);ke(i.TEXTURE_CUBE_MAP,_);let j;if(ve){I&&te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,de,Ne,Ce.width,Ce.height);for(let Z=0;Z<6;Z++){j=ce[Z].mipmaps;for(let ge=0;ge<j.length;ge++){let De=j[ge];_.format!==hn?Me!==null?I?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,0,0,De.width,De.height,Me,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,Ne,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,0,0,De.width,De.height,Me,oe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,Ne,De.width,De.height,0,Me,oe,De.data)}}}else{if(j=_.mipmaps,I&&te){j.length>0&&de++;let Z=_t(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,de,Ne,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ee){I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ce[Z].width,ce[Z].height,Me,oe,ce[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ne,ce[Z].width,ce[Z].height,0,Me,oe,ce[Z].data);for(let ge=0;ge<j.length;ge++){let nt=j[ge].image[Z].image;I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,0,0,nt.width,nt.height,Me,oe,nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,Ne,nt.width,nt.height,0,Me,oe,nt.data)}}else{I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Me,oe,ce[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ne,Me,oe,ce[Z]);for(let ge=0;ge<j.length;ge++){let De=j[ge];I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,0,0,Me,oe,De.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,Ne,Me,oe,De.image[Z])}}}m(_)&&u(i.TEXTURE_CUBE_MAP),G.__version=$.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function pe(T,_,F,W,$,G){let be=r.convert(F.format,F.colorSpace),ie=r.convert(F.type),ye=S(F.internalFormat,be,ie,F.colorSpace),ve=n.get(_),ee=n.get(F);if(ee.__renderTarget=_,!ve.__hasExternalTextures){let ce=Math.max(1,_.width>>G),Ce=Math.max(1,_.height>>G);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,G,ye,ce,Ce,_.depth,0,be,ie,null):t.texImage2D($,G,ye,ce,Ce,0,be,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,$,ee.__webglTexture,0,ht(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,$,ee.__webglTexture,G),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(T,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let W=_.depthTexture,$=W&&W.isDepthTexture?W.type:null,G=v(_.stencilBuffer,$),be=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=ht(_);xe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,G,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,G,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,G,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,T)}else{let W=_.textures;for(let $=0;$<W.length;$++){let G=W[$],be=r.convert(G.format,G.colorSpace),ie=r.convert(G.type),ye=S(G.internalFormat,be,ie,G.colorSpace),ve=ht(_);F&&xe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,ye,_.width,_.height):xe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,ye,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ye,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),K(_.depthTexture,0);let $=W.__webglTexture,G=ht(_);if(_.depthTexture.format===ji)xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(_.depthTexture.format===ds)xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ge(T){let _=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let W=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){let $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",$)};W.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=W}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let W=T.texture.mipmaps;W&&W.length>0?Se(_.__webglFramebuffer[0],T):Se(_.__webglFramebuffer,T)}else if(F){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),Le(_.__webglDepthbuffer[W],T,!1);else{let $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,G)}}else{let W=T.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Le(_.__webglDepthbuffer,T,!1);else{let $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,G)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(T,_,F){let W=n.get(T);_!==void 0&&pe(W.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ge(T)}function A(T){let _=T.texture,F=n.get(T),W=n.get(_);T.addEventListener("dispose",P);let $=T.textures,G=T.isWebGLCubeRenderTarget===!0,be=$.length>1;if(be||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,a.memory.textures++),G){F.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ie]=[];for(let ye=0;ye<_.mipmaps.length;ye++)F.__webglFramebuffer[ie][ye]=i.createFramebuffer()}else F.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)F.__webglFramebuffer[ie]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(be)for(let ie=0,ye=$.length;ie<ye;ie++){let ve=n.get($[ie]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&xe(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ie=0;ie<$.length;ie++){let ye=$[ie];F.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ie]);let ve=r.convert(ye.format,ye.colorSpace),ee=r.convert(ye.type),ce=S(ye.internalFormat,ve,ee,ye.colorSpace,T.isXRRenderTarget===!0),Ce=ht(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,ce,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,F.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0)for(let ye=0;ye<_.mipmaps.length;ye++)pe(F.__webglFramebuffer[ie][ye],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ye);else pe(F.__webglFramebuffer[ie],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(_)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ie=0,ye=$.length;ie<ye;ie++){let ve=$[ie],ee=n.get(ve),ce=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ce=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),ke(ce,ve),pe(F.__webglFramebuffer,T,ve,i.COLOR_ATTACHMENT0+ie,ce,0),m(ve)&&u(ce)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ie=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,W.__webglTexture),ke(ie,_),_.mipmaps&&_.mipmaps.length>0)for(let ye=0;ye<_.mipmaps.length;ye++)pe(F.__webglFramebuffer[ye],T,_,i.COLOR_ATTACHMENT0,ie,ye);else pe(F.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,ie,0);m(_)&&u(ie),t.unbindTexture()}T.depthBuffer&&Ge(T)}function ct(T){let _=T.textures;for(let F=0,W=_.length;F<W;F++){let $=_[F];if(m($)){let G=w(T),be=n.get($).__webglTexture;t.bindTexture(G,be),u(G),t.unbindTexture()}}}let Ue=[],Re=[];function _e(T){if(T.samples>0){if(xe(T)===!1){let _=T.textures,F=T.width,W=T.height,$=i.COLOR_BUFFER_BIT,G=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(T),ie=_.length>1;if(ie)for(let ve=0;ve<_.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let ye=T.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ve=0;ve<_.length;ve++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[ve]);let ee=n.get(_[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,F,W,0,0,F,W,$,i.NEAREST),c===!0&&(Ue.length=0,Re.length=0,Ue.push(i.COLOR_ATTACHMENT0+ve),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ue.push(G),Re.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let ve=0;ve<_.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,be.__webglColorRenderbuffer[ve]);let ee=n.get(_[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ht(T){return Math.min(s.maxSamples,T.samples)}function xe(T){let _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Oe(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function Ct(T,_){let F=T.colorSpace,W=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Mi&&F!==qn&&(He.getTransfer(F)===Ze?(W!==hn||$!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function _t(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=z,this.setTexture2D=K,this.setTexture2DArray=X,this.setTexture3D=ne,this.setTextureCube=V,this.rebindTextures=Lt,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=xe}function Lm(i,e){function t(n,s=qn){let r,a=He.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===Ua)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Na)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===El)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sl)return i.BYTE;if(n===Tl)return i.SHORT;if(n===cs)return i.UNSIGNED_SHORT;if(n===Da)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===hs)return i.HALF_FLOAT;if(n===Al)return i.ALPHA;if(n===Cl)return i.RGB;if(n===hn)return i.RGBA;if(n===ji)return i.DEPTH_COMPONENT;if(n===ds)return i.DEPTH_STENCIL;if(n===Fa)return i.RED;if(n===Oa)return i.RED_INTEGER;if(n===Rl)return i.RG;if(n===Ba)return i.RG_INTEGER;if(n===za)return i.RGBA_INTEGER;if(n===sr||n===rr||n===ar||n===or)if(a===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Va||n===Ga||n===Ha)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wa||n===Xa||n===qa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wa||n===Xa)return a===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ya||n===Za||n===Ka||n===$a||n===Ja||n===ja||n===Qa||n===eo||n===to||n===no||n===io||n===so||n===ro||n===ao)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ya)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Za)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ka)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$a)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ja)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===eo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===to)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===no)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===io)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===so)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ro)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ao)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oo||n===lo||n===co)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===oo)return a===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===lo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===co)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ho||n===uo||n===fo||n===po)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ho)return r.COMPRESSED_RED_RGTC1_EXT;if(n===uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===po)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Dm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Um=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,jl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ks(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new vt({vertexShader:Dm,fragmentShader:Um,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ql=class extends Mn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,f=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new jl,u={},w=t.getContextAttributes(),S=null,v=null,R=[],C=[],P=new fe,N=null,b=new Ft;b.viewport=new st;let M=new Ft;M.viewport=new st;let L=[b,M],z=new va,H=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let J=R[Y];return J===void 0&&(J=new ss,R[Y]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Y){let J=R[Y];return J===void 0&&(J=new ss,R[Y]=J),J.getGripSpace()},this.getHand=function(Y){let J=R[Y];return J===void 0&&(J=new ss,R[Y]=J),J.getHandSpace()};function K(Y){let J=C.indexOf(Y.inputSource);if(J===-1)return;let pe=R[J];pe!==void 0&&(pe.update(Y.inputSource,Y.frame,l||a),pe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ne);for(let Y=0;Y<R.length;Y++){let J=C[Y];J!==null&&(C[Y]=null,R[Y].disconnect(J))}H=null,q=null,m.reset();for(let Y in u)delete u[Y];e.setRenderTarget(S),p=null,f=null,d=null,s=null,v=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ne),w.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Le=null,Se=null;w.depth&&(Se=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=w.stencil?ds:ji,Le=w.stencil?us:ci);let Ge={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new bn(f.textureWidth,f.textureHeight,{format:hn,type:Cn,depthTexture:new Zs(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new bn(p.framebufferWidth,p.framebufferHeight,{format:hn,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne(Y){for(let J=0;J<Y.removed.length;J++){let pe=Y.removed[J],Le=C.indexOf(pe);Le>=0&&(C[Le]=null,R[Le].disconnect(pe))}for(let J=0;J<Y.added.length;J++){let pe=Y.added[J],Le=C.indexOf(pe);if(Le===-1){for(let Ge=0;Ge<R.length;Ge++)if(Ge>=C.length){C.push(pe),Le=Ge;break}else if(C[Ge]===null){C[Ge]=pe,Le=Ge;break}if(Le===-1)break}let Se=R[Le];Se&&Se.connect(pe)}}let V=new E,ae=new E;function he(Y,J,pe){V.setFromMatrixPosition(J.matrixWorld),ae.setFromMatrixPosition(pe.matrixWorld);let Le=V.distanceTo(ae),Se=J.projectionMatrix.elements,Ge=pe.projectionMatrix.elements,Lt=Se[14]/(Se[10]-1),A=Se[14]/(Se[10]+1),ct=(Se[9]+1)/Se[5],Ue=(Se[9]-1)/Se[5],Re=(Se[8]-1)/Se[0],_e=(Ge[8]+1)/Ge[0],ht=Lt*Re,xe=Lt*_e,Oe=Le/(-Re+_e),Ct=Oe*-Re;if(J.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ct),Y.translateZ(Oe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Se[10]===-1)Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let _t=Lt+Oe,T=A+Oe,_=ht-Ct,F=xe+(Le-Ct),W=ct*A/T*_t,$=Ue*A/T*_t;Y.projectionMatrix.makePerspective(_,F,W,$,_t,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Te(Y,J){J===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(J.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let J=Y.near,pe=Y.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),z.near=M.near=b.near=J,z.far=M.far=b.far=pe,(H!==z.near||q!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),H=z.near,q=z.far),z.layers.mask=Y.layers.mask|6,b.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;let Le=Y.parent,Se=z.cameras;Te(z,Le);for(let Ge=0;Ge<Se.length;Ge++)Te(Se[Ge],Le);Se.length===2?he(z,b,M):z.projectionMatrix.copy(b.projectionMatrix),ke(Y,z,Le)};function ke(Y,J,pe){pe===null?Y.matrix.copy(J.matrixWorld):(Y.matrix.copy(pe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(J.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Qi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Y){return u[Y]};let tt=null;function lt(Y,J){if(h=J.getViewerPose(l||a),g=J,h!==null){let pe=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Le=!1;pe.length!==z.cameras.length&&(z.cameras.length=0,Le=!0);for(let A=0;A<pe.length;A++){let ct=pe[A],Ue=null;if(p!==null)Ue=p.getViewport(ct);else{let _e=d.getViewSubImage(f,ct);Ue=_e.viewport,A===0&&(e.setRenderTargetTextures(v,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(v))}let Re=L[A];Re===void 0&&(Re=new Ft,Re.layers.enable(A),Re.viewport=new st,L[A]=Re),Re.matrix.fromArray(ct.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(ct.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),A===0&&(z.matrix.copy(Re.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Le===!0&&z.cameras.push(Re)}let Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let A=d.getDepthInformation(pe[0]);A&&A.isValid&&A.texture&&m.init(A,s.renderState)}if(Se&&Se.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let A=0;A<pe.length;A++){let ct=pe[A].camera;if(ct){let Ue=u[ct];Ue||(Ue=new Ks,u[ct]=Ue);let Re=d.getCameraImage(ct);Ue.sourceTexture=Re}}}}for(let pe=0;pe<R.length;pe++){let Le=C[pe],Se=R[pe];Le!==null&&Se!==void 0&&Se.update(Le,J,l||a)}tt&&tt(Y,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let qe=new du;qe.setAnimationLoop(lt),this.setAnimationLoop=function(Y){tt=Y},this.dispose=function(){}}},Ri=new Tn,Nm=new Ke;function Fm(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,Nl(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,w,S,v){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,v)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),x(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?c(m,u,w,S):u.isSpriteMaterial?l(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Gt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Gt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let w=e.get(u),S=w.envMap,v=w.envMapRotation;S&&(m.envMap.value=S,Ri.copy(v),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),m.envMapRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(Ri)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function c(m,u,w,S){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*w,m.scale.value=S*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function l(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,w){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Gt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function x(m,u){let w=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Om(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,S){let v=S.program;n.uniformBlockBinding(w,v)}function l(w,S){let v=s[w.id];v===void 0&&(g(w),v=h(w),s[w.id]=v,w.addEventListener("dispose",m));let R=S.program;n.updateUBOMapping(w,R);let C=e.render.frame;r[w.id]!==C&&(f(w),r[w.id]=C)}function h(w){let S=d();w.__bindingPointIndex=S;let v=i.createBuffer(),R=w.__size,C=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){let S=s[w.id],v=w.uniforms,R=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let C=0,P=v.length;C<P;C++){let N=Array.isArray(v[C])?v[C]:[v[C]];for(let b=0,M=N.length;b<M;b++){let L=N[b];if(p(L,C,b,R)===!0){let z=L.__offset,H=Array.isArray(L.value)?L.value:[L.value],q=0;for(let K=0;K<H.length;K++){let X=H[K],ne=x(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,z+q,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,q),q+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(w,S,v,R){let C=w.value,P=S+"_"+v;if(R[P]===void 0)return typeof C=="number"||typeof C=="boolean"?R[P]=C:R[P]=C.clone(),!0;{let N=R[P];if(typeof C=="number"||typeof C=="boolean"){if(N!==C)return R[P]=C,!0}else if(N.equals(C)===!1)return N.copy(C),!0}return!1}function g(w){let S=w.uniforms,v=0,R=16;for(let P=0,N=S.length;P<N;P++){let b=Array.isArray(S[P])?S[P]:[S[P]];for(let M=0,L=b.length;M<L;M++){let z=b[M],H=Array.isArray(z.value)?z.value:[z.value];for(let q=0,K=H.length;q<K;q++){let X=H[q],ne=x(X),V=v%R,ae=V%ne.boundary,he=V+ae;v+=ae,he!==0&&R-he<ne.storage&&(v+=R-he),z.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=v,v+=ne.storage}}}let C=v%R;return C>0&&(v+=R-C),w.__size=v,w.__cache={},this}function x(w){let S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),S}function m(w){let S=w.target;S.removeEventListener("dispose",m);let v=a.indexOf(S.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function u(){for(let w in s)i.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:c,update:l,dispose:u}}var yo=class{constructor(e={}){let{canvas:t=Bh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),x=new Int32Array(4),m=null,u=null,w=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,R=!1;this._outputColorSpace=Nt;let C=0,P=0,N=null,b=-1,M=null,L=new st,z=new st,H=null,q=new Fe(0),K=0,X=t.width,ne=t.height,V=1,ae=null,he=null,Te=new st(0,0,X,ne),ke=new st(0,0,X,ne),tt=!1,lt=new Ys,qe=!1,Y=!1,J=new Ke,pe=new E,Le=new st,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function Lt(){return N===null?V:1}let A=n;function ct(y,D){return t.getContext(y,D)}try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",j,!1),A===null){let D="webgl2";if(A=ct(D,y),A===null)throw ct(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ue,Re,_e,ht,xe,Oe,Ct,_t,T,_,F,W,$,G,be,ie,ye,ve,ee,ce,Ce,Me,oe,Ne;function I(){Ue=new t1(A),Ue.init(),Me=new Lm(A,Ue),Re=new Zp(A,Ue,e,Me),_e=new Pm(A,Ue),Re.reversedDepthBuffer&&f&&_e.buffers.depth.setReversed(!0),ht=new s1(A),xe=new _m,Oe=new Im(A,Ue,_e,xe,Re,Me,ht),Ct=new $p(v),_t=new e1(v),T=new cd(A),oe=new qp(A,T),_=new n1(A,T,ht,oe),F=new a1(A,_,T,ht),ee=new r1(A,Re,Oe),ie=new Kp(xe),W=new gm(v,Ct,_t,Ue,Re,oe,ie),$=new Fm(v,xe),G=new ym,be=new wm(Ue),ve=new Xp(v,Ct,_t,_e,F,p,c),ye=new Cm(v,F,Re),Ne=new Om(A,ht,Re,_e),ce=new Yp(A,Ue,ht),Ce=new i1(A,Ue,ht),ht.programs=W.programs,v.capabilities=Re,v.extensions=Ue,v.properties=xe,v.renderLists=G,v.shadowMap=ye,v.state=_e,v.info=ht}I();let te=new Ql(v,A);this.xr=te,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let y=Ue.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Ue.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(y){y!==void 0&&(V=y,this.setSize(X,ne,!1))},this.getSize=function(y){return y.set(X,ne)},this.setSize=function(y,D,O=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,ne=D,t.width=Math.floor(y*V),t.height=Math.floor(D*V),O===!0&&(t.style.width=y+"px",t.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(X*V,ne*V).floor()},this.setDrawingBufferSize=function(y,D,O){X=y,ne=D,V=O,t.width=Math.floor(y*O),t.height=Math.floor(D*O),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(Te)},this.setViewport=function(y,D,O,B){y.isVector4?Te.set(y.x,y.y,y.z,y.w):Te.set(y,D,O,B),_e.viewport(L.copy(Te).multiplyScalar(V).round())},this.getScissor=function(y){return y.copy(ke)},this.setScissor=function(y,D,O,B){y.isVector4?ke.set(y.x,y.y,y.z,y.w):ke.set(y,D,O,B),_e.scissor(z.copy(ke).multiplyScalar(V).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(y){_e.setScissorTest(tt=y)},this.setOpaqueSort=function(y){ae=y},this.setTransparentSort=function(y){he=y},this.getClearColor=function(y){return y.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,O=!0){let B=0;if(y){let U=!1;if(N!==null){let Q=N.texture.format;U=Q===za||Q===Ba||Q===Oa}if(U){let Q=N.texture.type,le=Q===Cn||Q===ci||Q===cs||Q===us||Q===Ua||Q===Na,me=ve.getClearColor(),ue=ve.getClearAlpha(),Ae=me.r,Pe=me.g,we=me.b;le?(g[0]=Ae,g[1]=Pe,g[2]=we,g[3]=ue,A.clearBufferuiv(A.COLOR,0,g)):(x[0]=Ae,x[1]=Pe,x[2]=we,x[3]=ue,A.clearBufferiv(A.COLOR,0,x))}else B|=A.COLOR_BUFFER_BIT}D&&(B|=A.DEPTH_BUFFER_BIT),O&&(B|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",j,!1),ve.dispose(),G.dispose(),be.dispose(),xe.dispose(),Ct.dispose(),_t.dispose(),F.dispose(),oe.dispose(),Ne.dispose(),W.dispose(),te.dispose(),te.removeEventListener("sessionstart",vn),te.removeEventListener("sessionend",_c),di.stop()};function se(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let y=ht.autoReset,D=ye.enabled,O=ye.autoUpdate,B=ye.needsUpdate,U=ye.type;I(),ht.autoReset=y,ye.enabled=D,ye.autoUpdate=O,ye.needsUpdate=B,ye.type=U}function j(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Z(y){let D=y.target;D.removeEventListener("dispose",Z),ge(D)}function ge(y){De(y),xe.remove(y)}function De(y){let D=xe.get(y).programs;D!==void 0&&(D.forEach(function(O){W.releaseProgram(O)}),y.isShaderMaterial&&W.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,O,B,U,Q){D===null&&(D=Se);let le=U.isMesh&&U.matrixWorld.determinant()<0,me=Ju(y,D,O,B,U);_e.setMaterial(B,le);let ue=O.index,Ae=1;if(B.wireframe===!0){if(ue=_.getWireframeAttribute(O),ue===void 0)return;Ae=2}let Pe=O.drawRange,we=O.attributes.position,Ve=Pe.start*Ae,Je=(Pe.start+Pe.count)*Ae;Q!==null&&(Ve=Math.max(Ve,Q.start*Ae),Je=Math.min(Je,(Q.start+Q.count)*Ae)),ue!==null?(Ve=Math.max(Ve,0),Je=Math.min(Je,ue.count)):we!=null&&(Ve=Math.max(Ve,0),Je=Math.min(Je,we.count));let pt=Je-Ve;if(pt<0||pt===1/0)return;oe.setup(U,B,me,O,ue);let rt,Qe=ce;if(ue!==null&&(rt=T.get(ue),Qe=Ce,Qe.setIndex(rt)),U.isMesh)B.wireframe===!0?(_e.setLineWidth(B.wireframeLinewidth*Lt()),Qe.setMode(A.LINES)):Qe.setMode(A.TRIANGLES);else if(U.isLine){let Ee=B.linewidth;Ee===void 0&&(Ee=1),_e.setLineWidth(Ee*Lt()),U.isLineSegments?Qe.setMode(A.LINES):U.isLineLoop?Qe.setMode(A.LINE_LOOP):Qe.setMode(A.LINE_STRIP)}else U.isPoints?Qe.setMode(A.POINTS):U.isSprite&&Qe.setMode(A.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)es("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Qe.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))Qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Ee=U._multiDrawStarts,ut=U._multiDrawCounts,We=U._multiDrawCount,Kt=ue?T.get(ue).bytesPerElement:1,Ni=xe.get(B).currentProgram.getUniforms();for(let $t=0;$t<We;$t++)Ni.setValue(A,"_gl_DrawID",$t),Qe.render(Ee[$t]/Kt,ut[$t])}else if(U.isInstancedMesh)Qe.renderInstances(Ve,pt,U.count);else if(O.isInstancedBufferGeometry){let Ee=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ut=Math.min(O.instanceCount,Ee);Qe.renderInstances(Ve,pt,ut)}else Qe.render(Ve,pt)};function nt(y,D,O){y.transparent===!0&&y.side===cn&&y.forceSinglePass===!1?(y.side=Gt,y.needsUpdate=!0,gr(y,D,O),y.side=zn,y.needsUpdate=!0,gr(y,D,O),y.side=cn):gr(y,D,O)}this.compile=function(y,D,O=null){O===null&&(O=y),u=be.get(O),u.init(D),S.push(u),O.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),y!==O&&y.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),u.setupLights();let B=new Set;return y.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let Q=U.material;if(Q)if(Array.isArray(Q))for(let le=0;le<Q.length;le++){let me=Q[le];nt(me,O,U),B.add(me)}else nt(Q,O,U),B.add(Q)}),u=S.pop(),B},this.compileAsync=function(y,D,O=null){let B=this.compile(y,D,O);return new Promise(U=>{function Q(){if(B.forEach(function(le){xe.get(le).currentProgram.isReady()&&B.delete(le)}),B.size===0){U(y);return}setTimeout(Q,10)}Ue.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ye=null;function Ln(y){Ye&&Ye(y)}function vn(){di.stop()}function _c(){di.start()}let di=new du;di.setAnimationLoop(Ln),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(y){Ye=y,te.setAnimationLoop(y),y===null?di.stop():di.start()},te.addEventListener("sessionstart",vn),te.addEventListener("sessionend",_c),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(D),D=te.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,D,N),u=be.get(y,S.length),u.init(D),S.push(u),J.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),lt.setFromProjectionMatrix(J,pn,D.reversedDepth),Y=this.localClippingEnabled,qe=ie.init(this.clippingPlanes,Y),m=G.get(y,w.length),m.init(),w.push(m),te.enabled===!0&&te.isPresenting===!0){let Q=v.xr.getDepthSensingMesh();Q!==null&&Fo(Q,D,-1/0,v.sortObjects)}Fo(y,D,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ae,he),Ge=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ge&&ve.addToRenderList(m,y),this.info.render.frame++,qe===!0&&ie.beginShadows();let O=u.state.shadowsArray;ye.render(O,y,D),qe===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=m.opaque,U=m.transmissive;if(u.setupLights(),D.isArrayCamera){let Q=D.cameras;if(U.length>0)for(let le=0,me=Q.length;le<me;le++){let ue=Q[le];yc(B,U,y,ue)}Ge&&ve.render(y);for(let le=0,me=Q.length;le<me;le++){let ue=Q[le];xc(m,y,ue,ue.viewport)}}else U.length>0&&yc(B,U,y,D),Ge&&ve.render(y),xc(m,y,D);N!==null&&P===0&&(Oe.updateMultisampleRenderTarget(N),Oe.updateRenderTargetMipmap(N)),y.isScene===!0&&y.onAfterRender(v,y,D),oe.resetDefaultState(),b=-1,M=null,S.pop(),S.length>0?(u=S[S.length-1],qe===!0&&ie.setGlobalState(v.clippingPlanes,u.state.camera)):u=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Fo(y,D,O,B){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||lt.intersectsSprite(y)){B&&Le.setFromMatrixPosition(y.matrixWorld).applyMatrix4(J);let le=F.update(y),me=y.material;me.visible&&m.push(y,le,me,O,Le.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||lt.intersectsObject(y))){let le=F.update(y),me=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Le.copy(y.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Le.copy(le.boundingSphere.center)),Le.applyMatrix4(y.matrixWorld).applyMatrix4(J)),Array.isArray(me)){let ue=le.groups;for(let Ae=0,Pe=ue.length;Ae<Pe;Ae++){let we=ue[Ae],Ve=me[we.materialIndex];Ve&&Ve.visible&&m.push(y,le,Ve,O,Le.z,we)}}else me.visible&&m.push(y,le,me,O,Le.z,null)}}let Q=y.children;for(let le=0,me=Q.length;le<me;le++)Fo(Q[le],D,O,B)}function xc(y,D,O,B){let U=y.opaque,Q=y.transmissive,le=y.transparent;u.setupLightsView(O),qe===!0&&ie.setGlobalState(v.clippingPlanes,O),B&&_e.viewport(L.copy(B)),U.length>0&&mr(U,D,O),Q.length>0&&mr(Q,D,O),le.length>0&&mr(le,D,O),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function yc(y,D,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[B.id]===void 0&&(u.state.transmissionRenderTarget[B.id]=new bn(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?hs:Cn,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:He.workingColorSpace}));let Q=u.state.transmissionRenderTarget[B.id],le=B.viewport||L;Q.setSize(le.z*v.transmissionResolutionScale,le.w*v.transmissionResolutionScale);let me=v.getRenderTarget(),ue=v.getActiveCubeFace(),Ae=v.getActiveMipmapLevel();v.setRenderTarget(Q),v.getClearColor(q),K=v.getClearAlpha(),K<1&&v.setClearColor(16777215,.5),v.clear(),Ge&&ve.render(O);let Pe=v.toneMapping;v.toneMapping=Xn;let we=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),u.setupLightsView(B),qe===!0&&ie.setGlobalState(v.clippingPlanes,B),mr(y,O,B),Oe.updateMultisampleRenderTarget(Q),Oe.updateRenderTargetMipmap(Q),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Je=0,pt=D.length;Je<pt;Je++){let rt=D[Je],Qe=rt.object,Ee=rt.geometry,ut=rt.material,We=rt.group;if(ut.side===cn&&Qe.layers.test(B.layers)){let Kt=ut.side;ut.side=Gt,ut.needsUpdate=!0,vc(Qe,O,B,Ee,ut,We),ut.side=Kt,ut.needsUpdate=!0,Ve=!0}}Ve===!0&&(Oe.updateMultisampleRenderTarget(Q),Oe.updateRenderTargetMipmap(Q))}v.setRenderTarget(me,ue,Ae),v.setClearColor(q,K),we!==void 0&&(B.viewport=we),v.toneMapping=Pe}function mr(y,D,O){let B=D.isScene===!0?D.overrideMaterial:null;for(let U=0,Q=y.length;U<Q;U++){let le=y[U],me=le.object,ue=le.geometry,Ae=le.group,Pe=le.material;Pe.allowOverride===!0&&B!==null&&(Pe=B),me.layers.test(O.layers)&&vc(me,D,O,ue,Pe,Ae)}}function vc(y,D,O,B,U,Q){y.onBeforeRender(v,D,O,B,U,Q),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(v,D,O,B,y,Q),U.transparent===!0&&U.side===cn&&U.forceSinglePass===!1?(U.side=Gt,U.needsUpdate=!0,v.renderBufferDirect(O,D,B,U,y,Q),U.side=zn,U.needsUpdate=!0,v.renderBufferDirect(O,D,B,U,y,Q),U.side=cn):v.renderBufferDirect(O,D,B,U,y,Q),y.onAfterRender(v,D,O,B,U,Q)}function gr(y,D,O){D.isScene!==!0&&(D=Se);let B=xe.get(y),U=u.state.lights,Q=u.state.shadowsArray,le=U.state.version,me=W.getParameters(y,U.state,Q,D,O),ue=W.getProgramCacheKey(me),Ae=B.programs;B.environment=y.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(y.isMeshStandardMaterial?_t:Ct).get(y.envMap||B.environment),B.envMapRotation=B.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Ae===void 0&&(y.addEventListener("dispose",Z),Ae=new Map,B.programs=Ae);let Pe=Ae.get(ue);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===le)return bc(y,me),Pe}else me.uniforms=W.getUniforms(y),y.onBeforeCompile(me,v),Pe=W.acquireProgram(me,ue),Ae.set(ue,Pe),B.uniforms=me.uniforms;let we=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(we.clippingPlanes=ie.uniform),bc(y,me),B.needsLights=Qu(y),B.lightsStateVersion=le,B.needsLights&&(we.ambientLightColor.value=U.state.ambient,we.lightProbe.value=U.state.probe,we.directionalLights.value=U.state.directional,we.directionalLightShadows.value=U.state.directionalShadow,we.spotLights.value=U.state.spot,we.spotLightShadows.value=U.state.spotShadow,we.rectAreaLights.value=U.state.rectArea,we.ltc_1.value=U.state.rectAreaLTC1,we.ltc_2.value=U.state.rectAreaLTC2,we.pointLights.value=U.state.point,we.pointLightShadows.value=U.state.pointShadow,we.hemisphereLights.value=U.state.hemi,we.directionalShadowMap.value=U.state.directionalShadowMap,we.directionalShadowMatrix.value=U.state.directionalShadowMatrix,we.spotShadowMap.value=U.state.spotShadowMap,we.spotLightMatrix.value=U.state.spotLightMatrix,we.spotLightMap.value=U.state.spotLightMap,we.pointShadowMap.value=U.state.pointShadowMap,we.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function Mc(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=gs.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function bc(y,D){let O=xe.get(y);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.batchingColor=D.batchingColor,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.instancingMorph=D.instancingMorph,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function Ju(y,D,O,B,U){D.isScene!==!0&&(D=Se),Oe.resetTextureUnits();let Q=D.fog,le=B.isMeshStandardMaterial?D.environment:null,me=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Mi,ue=(B.isMeshStandardMaterial?_t:Ct).get(B.envMap||le),Ae=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Pe=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),we=!!O.morphAttributes.position,Ve=!!O.morphAttributes.normal,Je=!!O.morphAttributes.color,pt=Xn;B.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(pt=v.toneMapping);let rt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Qe=rt!==void 0?rt.length:0,Ee=xe.get(B),ut=u.state.lights;if(qe===!0&&(Y===!0||y!==M)){let kt=y===M&&B.id===b;ie.setState(B,y,kt)}let We=!1;B.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==ut.state.version||Ee.outputColorSpace!==me||U.isBatchedMesh&&Ee.batching===!1||!U.isBatchedMesh&&Ee.batching===!0||U.isBatchedMesh&&Ee.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ee.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ee.instancing===!1||!U.isInstancedMesh&&Ee.instancing===!0||U.isSkinnedMesh&&Ee.skinning===!1||!U.isSkinnedMesh&&Ee.skinning===!0||U.isInstancedMesh&&Ee.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ee.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ee.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ee.instancingMorph===!1&&U.morphTexture!==null||Ee.envMap!==ue||B.fog===!0&&Ee.fog!==Q||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ie.numPlanes||Ee.numIntersection!==ie.numIntersection)||Ee.vertexAlphas!==Ae||Ee.vertexTangents!==Pe||Ee.morphTargets!==we||Ee.morphNormals!==Ve||Ee.morphColors!==Je||Ee.toneMapping!==pt||Ee.morphTargetsCount!==Qe)&&(We=!0):(We=!0,Ee.__version=B.version);let Kt=Ee.currentProgram;We===!0&&(Kt=gr(B,D,U));let Ni=!1,$t=!1,Ts=!1,dt=Kt.getUniforms(),nn=Ee.uniforms;if(_e.useProgram(Kt.program)&&(Ni=!0,$t=!0,Ts=!0),B.id!==b&&(b=B.id,$t=!0),Ni||M!==y){_e.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),dt.setValue(A,"projectionMatrix",y.projectionMatrix),dt.setValue(A,"viewMatrix",y.matrixWorldInverse);let Ht=dt.map.cameraPosition;Ht!==void 0&&Ht.setValue(A,pe.setFromMatrixPosition(y.matrixWorld)),Re.logarithmicDepthBuffer&&dt.setValue(A,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&dt.setValue(A,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,$t=!0,Ts=!0)}if(U.isSkinnedMesh){dt.setOptional(A,U,"bindMatrix"),dt.setOptional(A,U,"bindMatrixInverse");let kt=U.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),dt.setValue(A,"boneTexture",kt.boneTexture,Oe))}U.isBatchedMesh&&(dt.setOptional(A,U,"batchingTexture"),dt.setValue(A,"batchingTexture",U._matricesTexture,Oe),dt.setOptional(A,U,"batchingIdTexture"),dt.setValue(A,"batchingIdTexture",U._indirectTexture,Oe),dt.setOptional(A,U,"batchingColorTexture"),U._colorsTexture!==null&&dt.setValue(A,"batchingColorTexture",U._colorsTexture,Oe));let sn=O.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&ee.update(U,O,Kt),($t||Ee.receiveShadow!==U.receiveShadow)&&(Ee.receiveShadow=U.receiveShadow,dt.setValue(A,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(nn.envMap.value=ue,nn.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(nn.envMapIntensity.value=D.environmentIntensity),$t&&(dt.setValue(A,"toneMappingExposure",v.toneMappingExposure),Ee.needsLights&&ju(nn,Ts),Q&&B.fog===!0&&$.refreshFogUniforms(nn,Q),$.refreshMaterialUniforms(nn,B,V,ne,u.state.transmissionRenderTarget[y.id]),gs.upload(A,Mc(Ee),nn,Oe)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(gs.upload(A,Mc(Ee),nn,Oe),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&dt.setValue(A,"center",U.center),dt.setValue(A,"modelViewMatrix",U.modelViewMatrix),dt.setValue(A,"normalMatrix",U.normalMatrix),dt.setValue(A,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let kt=B.uniformsGroups;for(let Ht=0,Oo=kt.length;Ht<Oo;Ht++){let fi=kt[Ht];Ne.update(fi,Kt),Ne.bind(fi,Kt)}}return Kt}function ju(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function Qu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(y,D,O){let B=xe.get(y);B.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),xe.get(y.texture).__webglTexture=D,xe.get(y.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:O,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let O=xe.get(y);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0};let e0=A.createFramebuffer();this.setRenderTarget=function(y,D=0,O=0){N=y,C=D,P=O;let B=!0,U=null,Q=!1,le=!1;if(y){let ue=xe.get(y);if(ue.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(A.FRAMEBUFFER,null),B=!1;else if(ue.__webglFramebuffer===void 0)Oe.setupRenderTarget(y);else if(ue.__hasExternalTextures)Oe.rebindTextures(y,xe.get(y.texture).__webglTexture,xe.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let we=y.depthTexture;if(ue.__boundDepthTexture!==we){if(we!==null&&xe.has(we)&&(y.width!==we.image.width||y.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(y)}}let Ae=y.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(le=!0);let Pe=xe.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[D])?U=Pe[D][O]:U=Pe[D],Q=!0):y.samples>0&&Oe.useMultisampledRTT(y)===!1?U=xe.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?U=Pe[O]:U=Pe,L.copy(y.viewport),z.copy(y.scissor),H=y.scissorTest}else L.copy(Te).multiplyScalar(V).floor(),z.copy(ke).multiplyScalar(V).floor(),H=tt;if(O!==0&&(U=e0),_e.bindFramebuffer(A.FRAMEBUFFER,U)&&B&&_e.drawBuffers(y,U),_e.viewport(L),_e.scissor(z),_e.setScissorTest(H),Q){let ue=xe.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+D,ue.__webglTexture,O)}else if(le){let ue=D;for(let Ae=0;Ae<y.textures.length;Ae++){let Pe=xe.get(y.textures[Ae]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Ae,Pe.__webglTexture,O,ue)}}else if(y!==null&&O!==0){let ue=xe.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,ue.__webglTexture,O)}b=-1},this.readRenderTargetPixels=function(y,D,O,B,U,Q,le,me=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=xe.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){_e.bindFramebuffer(A.FRAMEBUFFER,ue);try{let Ae=y.textures[me],Pe=Ae.format,we=Ae.type;if(!Re.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Re.textureTypeReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-B&&O>=0&&O<=y.height-U&&(y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+me),A.readPixels(D,O,B,U,Me.convert(Pe),Me.convert(we),Q))}finally{let Ae=N!==null?xe.get(N).__webglFramebuffer:null;_e.bindFramebuffer(A.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(y,D,O,B,U,Q,le,me=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=xe.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue)if(D>=0&&D<=y.width-B&&O>=0&&O<=y.height-U){_e.bindFramebuffer(A.FRAMEBUFFER,ue);let Ae=y.textures[me],Pe=Ae.format,we=Ae.type;if(!Re.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Re.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ve=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Ve),A.bufferData(A.PIXEL_PACK_BUFFER,Q.byteLength,A.STREAM_READ),y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+me),A.readPixels(D,O,B,U,Me.convert(Pe),Me.convert(we),0);let Je=N!==null?xe.get(N).__webglFramebuffer:null;_e.bindFramebuffer(A.FRAMEBUFFER,Je);let pt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await zh(A,pt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Ve),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Q),A.deleteBuffer(Ve),A.deleteSync(pt),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,O=0){let B=Math.pow(2,-O),U=Math.floor(y.image.width*B),Q=Math.floor(y.image.height*B),le=D!==null?D.x:0,me=D!==null?D.y:0;Oe.setTexture2D(y,0),A.copyTexSubImage2D(A.TEXTURE_2D,O,0,0,le,me,U,Q),_e.unbindTexture()};let t0=A.createFramebuffer(),n0=A.createFramebuffer();this.copyTextureToTexture=function(y,D,O=null,B=null,U=0,Q=null){Q===null&&(U!==0?(es("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=U,U=0):Q=0);let le,me,ue,Ae,Pe,we,Ve,Je,pt,rt=y.isCompressedTexture?y.mipmaps[Q]:y.image;if(O!==null)le=O.max.x-O.min.x,me=O.max.y-O.min.y,ue=O.isBox3?O.max.z-O.min.z:1,Ae=O.min.x,Pe=O.min.y,we=O.isBox3?O.min.z:0;else{let sn=Math.pow(2,-U);le=Math.floor(rt.width*sn),me=Math.floor(rt.height*sn),y.isDataArrayTexture?ue=rt.depth:y.isData3DTexture?ue=Math.floor(rt.depth*sn):ue=1,Ae=0,Pe=0,we=0}B!==null?(Ve=B.x,Je=B.y,pt=B.z):(Ve=0,Je=0,pt=0);let Qe=Me.convert(D.format),Ee=Me.convert(D.type),ut;D.isData3DTexture?(Oe.setTexture3D(D,0),ut=A.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Oe.setTexture2DArray(D,0),ut=A.TEXTURE_2D_ARRAY):(Oe.setTexture2D(D,0),ut=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,D.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,D.unpackAlignment);let We=A.getParameter(A.UNPACK_ROW_LENGTH),Kt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Ni=A.getParameter(A.UNPACK_SKIP_PIXELS),$t=A.getParameter(A.UNPACK_SKIP_ROWS),Ts=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,rt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,rt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ae),A.pixelStorei(A.UNPACK_SKIP_ROWS,Pe),A.pixelStorei(A.UNPACK_SKIP_IMAGES,we);let dt=y.isDataArrayTexture||y.isData3DTexture,nn=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let sn=xe.get(y),kt=xe.get(D),Ht=xe.get(sn.__renderTarget),Oo=xe.get(kt.__renderTarget);_e.bindFramebuffer(A.READ_FRAMEBUFFER,Ht.__webglFramebuffer),_e.bindFramebuffer(A.DRAW_FRAMEBUFFER,Oo.__webglFramebuffer);for(let fi=0;fi<ue;fi++)dt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,xe.get(y).__webglTexture,U,we+fi),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,xe.get(D).__webglTexture,Q,pt+fi)),A.blitFramebuffer(Ae,Pe,le,me,Ve,Je,le,me,A.DEPTH_BUFFER_BIT,A.NEAREST);_e.bindFramebuffer(A.READ_FRAMEBUFFER,null),_e.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(U!==0||y.isRenderTargetTexture||xe.has(y)){let sn=xe.get(y),kt=xe.get(D);_e.bindFramebuffer(A.READ_FRAMEBUFFER,t0),_e.bindFramebuffer(A.DRAW_FRAMEBUFFER,n0);for(let Ht=0;Ht<ue;Ht++)dt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,sn.__webglTexture,U,we+Ht):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,sn.__webglTexture,U),nn?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,kt.__webglTexture,Q,pt+Ht):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,kt.__webglTexture,Q),U!==0?A.blitFramebuffer(Ae,Pe,le,me,Ve,Je,le,me,A.COLOR_BUFFER_BIT,A.NEAREST):nn?A.copyTexSubImage3D(ut,Q,Ve,Je,pt+Ht,Ae,Pe,le,me):A.copyTexSubImage2D(ut,Q,Ve,Je,Ae,Pe,le,me);_e.bindFramebuffer(A.READ_FRAMEBUFFER,null),_e.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else nn?y.isDataTexture||y.isData3DTexture?A.texSubImage3D(ut,Q,Ve,Je,pt,le,me,ue,Qe,Ee,rt.data):D.isCompressedArrayTexture?A.compressedTexSubImage3D(ut,Q,Ve,Je,pt,le,me,ue,Qe,rt.data):A.texSubImage3D(ut,Q,Ve,Je,pt,le,me,ue,Qe,Ee,rt):y.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Q,Ve,Je,le,me,Qe,Ee,rt.data):y.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Q,Ve,Je,rt.width,rt.height,Qe,rt.data):A.texSubImage2D(A.TEXTURE_2D,Q,Ve,Je,le,me,Qe,Ee,rt);A.pixelStorei(A.UNPACK_ROW_LENGTH,We),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Kt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ni),A.pixelStorei(A.UNPACK_SKIP_ROWS,$t),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ts),Q===0&&D.generateMipmaps&&A.generateMipmap(ut),_e.unbindTexture()},this.initRenderTarget=function(y){xe.get(y).__webglFramebuffer===void 0&&Oe.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Oe.setTextureCube(y,0):y.isData3DTexture?Oe.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Oe.setTexture2DArray(y,0):Oe.setTexture2D(y,0),_e.unbindTexture()},this.resetState=function(){C=0,P=0,N=null,_e.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=He._getDrawingBufferColorSpace(e),t.unpackColorSpace=He._getUnpackColorSpace()}};var _u={type:"change"},nc={type:"start"},yu={type:"end"},Mo=new kn,xu=new an,Bm=Math.cos(70*Dl.DEG2RAD),At=new E,qt=2*Math.PI,je={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},tc=1e-6,bo=class extends tr{constructor(e,t=null){super(e,t),this.state=je.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ai.ROTATE,MIDDLE:ai.DOLLY,RIGHT:ai.PAN},this.touches={ONE:oi.ROTATE,TWO:oi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new Qt,this._lastTargetPosition=new E,this._quat=new Qt().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ls,this._sphericalDelta=new ls,this._scale=1,this._panOffset=new E,this._rotateStart=new fe,this._rotateEnd=new fe,this._rotateDelta=new fe,this._panStart=new fe,this._panEnd=new fe,this._panDelta=new fe,this._dollyStart=new fe,this._dollyEnd=new fe,this._dollyDelta=new fe,this._dollyDirection=new E,this._mouse=new fe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=km.bind(this),this._onPointerDown=zm.bind(this),this._onPointerUp=Vm.bind(this),this._onContextMenu=Zm.bind(this),this._onMouseWheel=Wm.bind(this),this._onKeyDown=Xm.bind(this),this._onTouchStart=qm.bind(this),this._onTouchMove=Ym.bind(this),this._onMouseDown=Gm.bind(this),this._onMouseMove=Hm.bind(this),this._interceptControlDown=Km.bind(this),this._interceptControlUp=$m.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_u),this.update(),this.state=je.NONE}update(e=null){let t=this.object.position;At.copy(t).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===je.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=qt:n>Math.PI&&(n-=qt),s<-Math.PI?s+=qt:s>Math.PI&&(s-=qt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),t.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=At.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new E(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new E(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Mo.origin.copy(this.object.position),Mo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Mo.direction))<Bm?this.object.lookAt(this.target):(xu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Mo.intersectPlane(xu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>tc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>tc||this._lastTargetPosition.distanceToSquared(this.target)>tc?(this.dispatchEvent(_u),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?qt/60*this.autoRotateSpeed*e:qt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){At.setFromMatrixColumn(t,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,t){this.screenSpacePanning===!0?At.setFromMatrixColumn(t,1):(At.setFromMatrixColumn(t,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;At.copy(s).sub(this.target);let r=At.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new fe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function zm(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function km(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Vm(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yu),this.state=je.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Gm(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ai.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=je.DOLLY;break;case ai.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=je.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=je.ROTATE}break;case ai.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=je.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=je.PAN}break;default:this.state=je.NONE}this.state!==je.NONE&&this.dispatchEvent(nc)}function Hm(i){switch(this.state){case je.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case je.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Wm(i){this.enabled===!1||this.enableZoom===!1||this.state!==je.NONE||(i.preventDefault(),this.dispatchEvent(nc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(yu))}function Xm(i){this.enabled!==!1&&this._handleKeyDown(i)}function qm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case oi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=je.TOUCH_ROTATE;break;case oi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=je.TOUCH_PAN;break;default:this.state=je.NONE}break;case 2:switch(this.touches.TWO){case oi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=je.TOUCH_DOLLY_PAN;break;case oi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=je.TOUCH_DOLLY_ROTATE;break;default:this.state=je.NONE}break;default:this.state=je.NONE}this.state!==je.NONE&&this.dispatchEvent(nc)}function Ym(i){switch(this._trackPointer(i),this.state){case je.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case je.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case je.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case je.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=je.NONE}}function Zm(i){this.enabled!==!1&&i.preventDefault()}function Km(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $m(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var ic=(i,e,t)=>{let n=i*Math.PI/180,s=e*Math.PI/180;return[t*Math.cos(s)*Math.cos(n),t*Math.cos(s)*Math.sin(n),t*Math.sin(s)]},ys="https://imagine.gsfc.nasa.gov/features/cosmic/nearest_superclusters_info.html",Jm="https://science.nasa.gov/universe/galaxies/large-scale-structures/",vs=i=>"https://simbad.cds.unistra.fr/simbad/sim-id?Ident="+encodeURIComponent(i),jm=[{id:"local-group",name:"Groupe local",type:"group",ra:10.7,dec:41.3,d:.8,r:3,level:0,inside:["virgo-supercluster","laniakea"],contains:["milky-way","m31","m33"],summary:"Notre petit ensemble de galaxies. La Voie lact\xE9e et Androm\xE8de en sont les deux grandes composantes.",relation:"Nous sommes ici. Le Groupe local ne fait pas partie de l\u2019amas de la Vierge.",extent:"Enveloppe illustrative de 6 millions d\u2019al",links:[["NASA \xB7 groupes et amas",Jm]]},{id:"milky-way",name:"Voie lact\xE9e",type:"galaxy",ra:266.4168,dec:-29.0078,d:.027,r:.055,level:0,inside:["local-group"],summary:"Notre galaxie. Le Soleil se trouve dans son disque, \xE0 environ 27 000 al du centre.",relation:"Une galaxie, \xE0 l\u2019int\xE9rieur du Groupe local.",links:[["NASA \xB7 galaxies","https://science.nasa.gov/universe/galaxies/"]]},{id:"m31",name:"Androm\xE8de \xB7 M31",type:"galaxy",ra:10.68471,dec:41.26875,d:2.5,r:.11,level:0,inside:["local-group"],summary:"Grande galaxie spirale voisine de la Voie lact\xE9e.",relation:"Membre du Groupe local ; elle n\u2019est pas l\u2019\xE9tape suivante de la hi\xE9rarchie.",links:[["NASA \xB7 Androm\xE8de","https://www.nasa.gov/universe/galaxies/andromeda-galaxy/"]]},{id:"m33",name:"Triangle \xB7 M33",type:"galaxy",ra:23.46207,dec:30.66018,d:2.772,r:.03,level:0,inside:["local-group"],summary:"Galaxie spirale du Groupe local, plus petite qu\u2019Androm\xE8de.",relation:"Autre membre de notre groupe.",links:[["NASA \xB7 M33","https://www.nasa.gov/image-article/triangulum-galaxy/"]]},{id:"virgo-cluster",name:"Amas de la Vierge",type:"galaxy-cluster",ra:187.706,dec:12.391,d:54,r:6,level:1,inside:["virgo-supercluster","laniakea"],contains:["m87"],summary:"Une concentration de nombreuses galaxies, domin\xE9e notamment par M87. Un amas de galaxies est bien plus grand qu\u2019un amas d\u2019\xE9toiles.",relation:"Notre voisin, pas notre contenant : le Groupe local est en dehors de cet amas.",links:[["NASA \xB7 distance de la Vierge","https://science.nasa.gov/asset/hubble/dss-annotated-image-of-the-virgo-cluster/"],["CDS \xB7 direction de M87",vs("M87")]]},{id:"m87",name:"M87",type:"galaxy",ra:187.706,dec:12.391,d:54,r:.12,level:1,inside:["virgo-cluster"],summary:"Galaxie elliptique g\xE9ante de la Vierge, avec un trou noir central c\xE9l\xE8bre. Sa forme repr\xE9sent\xE9e ici est une reconstitution.",relation:"Une galaxie au c\u0153ur de l\u2019amas de la Vierge.",links:[["NASA \xB7 M87","https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-87/"]]},{id:"virgo-supercluster",name:"Superamas de la Vierge",type:"supercluster",ra:187.706,dec:12.391,d:54,r:60,level:1,inside:["laniakea"],contains:["local-group","virgo-cluster"],summary:"Le \xAB superamas local \xBB historique : une r\xE9gion comprenant notre Groupe local et l\u2019amas de la Vierge. Ce n\u2019est pas un gigantesque amas compact.",relation:"Premier grand ensemble qui nous englobe dans cette lecture. La Vierge donne son nom \xE0 deux structures diff\xE9rentes.",extent:"Enveloppe sch\xE9matique de 120 millions d\u2019al ; pas une fronti\xE8re mesur\xE9e",links:[["NASA \xB7 superamas proches",ys]]},{id:"centaurus",name:"Amas du Centaure",type:"galaxy-cluster",ra:192.2,dec:-41.3,d:170,r:7,level:2,inside:["laniakea"],summary:"Amas Abell 3526, l\u2019une des concentrations du voisinage Hydra\u2013Centaure.",relation:"Une autre concentration de galaxies dans la r\xE9gion de Laniakea.",links:[["NASA \xB7 Centaure",ys],["CDS \xB7 Abell 3526",vs("Abell 3526")]]},{id:"norma",name:"Amas de Norma",type:"galaxy-cluster",ra:243,dec:-60.9,d:220,r:7,level:2,inside:["great-attractor","laniakea"],summary:"Abell 3627 : un amas massif partiellement cach\xE9 derri\xE8re le plan de la Voie lact\xE9e.",relation:"Un rep\xE8re observ\xE9 dans la r\xE9gion du Grand Attracteur.",links:[["NASA \xB7 Norma et Grand Attracteur","https://science.nasa.gov/missions/hubble/hubble-focuses-on-the-great-attractor/"],["CDS \xB7 Abell 3627",vs("Abell 3627")]]},{id:"great-attractor",name:"Grand Attracteur",type:"attractor",ra:243,dec:-60.9,d:220,r:40,level:2,inside:["laniakea"],contains:["norma"],summary:"Une r\xE9gion de surdensit\xE9 associ\xE9e aux mouvements de galaxies. Ce n\u2019est ni une \xE9toile, ni un objet compact, ni un trou noir qui avale les galaxies.",relation:"Dans Laniakea. Le rep\xE8re est plac\xE9 vers Norma ; la r\xE9gion n\u2019a pas de centre ni de contour uniques pr\xE9cis\xE9ment \xE9tablis.",extent:"Zone de rep\xE9rage illustrative ; distance repr\xE9sentative de Norma",links:[["NASA \xB7 Grand Attracteur","https://science.nasa.gov/missions/hubble/hubble-focuses-on-the-great-attractor/"],["Tully et al. \xB7 Laniakea","https://www.nature.com/articles/nature13674"]]},{id:"laniakea",name:"Laniakea",type:"basin",ra:243,dec:-60.9,d:180,r:250,level:2,contains:["virgo-supercluster","great-attractor","centaurus"],summary:"Un bassin d\u2019attraction d\xE9fini \xE0 partir des mouvements particuliers des galaxies, apr\xE8s s\xE9paration de l\u2019expansion g\xE9n\xE9rale. Environ 500 millions d\u2019al d\u2019\xE9tendue.",relation:"Notre environnement \xE0 grande \xE9chelle selon la d\xE9finition de 2014. Ce bassin n\u2019est pas un ensemble enti\xE8rement li\xE9 qui restera assembl\xE9 pour toujours.",extent:"Enveloppe illustrative de 500 millions d\u2019al ; ne reproduit pas la fronti\xE8re Cosmicflows",links:[["Tully et al. 2014 \xB7 d\xE9finition","https://www.nature.com/articles/nature13674"],["NASA \xB7 \xE9chelle de Laniakea","https://science.nasa.gov/image-article/apod-2014-september-10-laniakea-our-home-supercluster-of-galaxies/"]]},{id:"perseus",name:"Amas de Pers\xE9e",type:"galaxy-cluster",ra:49.95,dec:41.51,d:240,r:7,level:2,inside:["perseus-pisces"],summary:"Abell 426, une concentration majeure de galaxies et de gaz chaud.",relation:"Dans une autre structure, Pers\xE9e\u2013Poissons, \xE0 c\xF4t\xE9 de notre environnement.",links:[["NASA \xB7 Pers\xE9e\u2013Poissons",ys],["CDS \xB7 Abell 426",vs("Abell 426")]]},{id:"perseus-pisces",name:"Pers\xE9e\u2013Poissons",type:"supercluster",ra:30,dec:30,d:220,r:150,level:2,contains:["perseus"],summary:"Un long ensemble de concentrations de galaxies, de l\u2019ordre de 300 millions d\u2019al d\u2019\xE9tendue.",relation:"Voisin de Laniakea, pas une couche qui l\u2019entoure. Orientation et forme du volume simplifi\xE9es.",links:[["NASA \xB7 Pers\xE9e\u2013Poissons",ys]]},{id:"coma",name:"Amas de Coma",type:"galaxy-cluster",ra:194.95,dec:27.98,d:305,r:8,level:3,inside:["coma-supercluster"],summary:"Abell 1656 : un amas riche de la Chevelure de B\xE9r\xE9nice.",relation:"Avec l\u2019amas du Lion, il domine le superamas de Coma.",links:[["NASA \xB7 Coma",ys],["CDS \xB7 Abell 1656",vs("Abell 1656")]]},{id:"coma-supercluster",name:"Superamas de Coma",type:"supercluster",ra:185,dec:25,d:300,r:70,level:3,contains:["coma"],summary:"R\xE9gion domin\xE9e par les amas de Coma et du Lion, appartenant au paysage de murs et de filaments proches.",relation:"Une structure voisine ; elle ne contient pas Laniakea.",extent:"Volume sch\xE9matique de rep\xE9rage",links:[["NASA \xB7 Coma",ys]]},{id:"hercules-cluster",name:"Amas d\u2019Hercule",type:"galaxy-cluster",ra:241.28,dec:17.75,d:500,r:7,level:3,inside:["hercules-supercluster"],summary:"Abell 2151, un amas riche en galaxies spirales et en interactions.",relation:"\xC0 distinguer du superamas d\u2019Hercule et de l\u2019amas globulaire M13, qui est dans notre propre galaxie.",links:[["NASA \xB7 Hercule","https://apod.nasa.gov/apod/ap201107.html"],["CDS \xB7 Abell 2151",vs("Abell 2151")]]},{id:"hercules-supercluster",name:"Superamas d\u2019Hercule",type:"supercluster",ra:241,dec:17,d:500,r:50,level:3,contains:["hercules-cluster"],summary:"Ensemble comprenant notamment les amas Abell 2147, 2151 et 2152.",relation:"Voisin du c\xF4t\xE9 proche du grand vide du Bouvier. Aucune relation avec une succession obligatoire de destinations.",extent:"Volume sch\xE9matique de rep\xE9rage",links:[["\xC9tude des amas d\u2019Hercule","https://ntrs.nasa.gov/search.jsp?R=19800036108"]]},{id:"shapley",name:"Concentration de Shapley",type:"supercluster",ra:202.5,dec:-31,d:650,r:80,level:3,summary:"Une concentration tr\xE8s massive de galaxies et d\u2019amas, \xE0 environ 650 millions d\u2019al.",relation:"Au-del\xE0 de la r\xE9gion du Grand Attracteur dans cette direction ; elle contribue au champ gravitationnel \xE0 grande \xE9chelle.",extent:"Volume sch\xE9matique autour de la concentration centrale",links:[["MPE \xB7 eROSITA et Shapley","https://www.mpe.mpg.de/7461761/news20200619?c=260760"]]},{id:"bootes-void",name:"Vide du Bouvier",type:"void",ra:222.5,dec:46,d:700,r:160,level:3,summary:"Une immense r\xE9gion beaucoup moins riche en galaxies que la moyenne. Elle contient tout de m\xEAme des galaxies : \xAB vide \xBB ne veut pas dire absence totale de mati\xE8re.",relation:"Une sous-densit\xE9 dans la toile cosmique, pas un objet qui nous englobe et pas un trou noir.",extent:"Diam\xE8tre de rep\xE9rage \u2248320 millions d\u2019al ; limites et distances d\xE9pendent de la d\xE9finition et de la cosmologie",links:[["Kirshner et al. 1987 \xB7 relev\xE9 original","https://articles.adsabs.harvard.edu/pdf/1987ApJ...314..493K"],["Relev\xE9 HI dans le vide","https://arxiv.org/abs/astro-ph/9511127"]]}],xn=jm.map(i=>({...i,p:ic(i.ra,i.dec,i.d),inside:i.inside||[],contains:i.contains||[],extent:i.extent||"Taille du volume de repr\xE9sentation, pas une limite physique nette"})),hi=[{id:"group",name:"Groupe local",span:8,focus:"local-group",text:"Des galaxies r\xE9unies dans notre groupe. La Vierge est encore beaucoup plus loin."},{id:"virgo",name:"Voisinage de la Vierge",span:150,focus:"virgo-supercluster",text:"Notre groupe et l\u2019amas de la Vierge : deux ensembles distincts dans le superamas local historique."},{id:"laniakea",name:"Laniakea et voisins",span:650,focus:"laniakea",text:"Bassin d\u2019attraction de Laniakea, r\xE9gion du Grand Attracteur et voisinage Pers\xE9e\u2013Poissons."},{id:"web",name:"Superamas et grands vides",span:1800,focus:"bootes-void",text:"Hercule, Coma, Shapley et le vide du Bouvier : des directions diff\xE9rentes dans la toile cosmique."}],sc={galaxy:"Galaxie",group:"Groupe de galaxies","galaxy-cluster":"Amas de galaxies",supercluster:"Superamas",basin:"Bassin d\u2019attraction",attractor:"R\xE9gion de surdensit\xE9",void:"Vide cosmique"};var Pn=3.261563777167433,yn={mcconnachie:{file:"mcconnachie-map.json",name:"Galaxies proches \xB7 McConnachie 2012",color:9298885,url:"https://cdsarc.cds.unistra.fr/viz-bin/cat/J/AJ/144/4",limit:"Catalogue historique, candidats et associations tels que publi\xE9s en 2012 ; pas un inventaire actuel exhaustif du Groupe local."},ungc:{file:"ungc-map.json",name:"Volume local \xB7 UNGC 2013",color:9224178,url:"https://cdsarc.cds.unistra.fr/viz-bin/cat/J/AJ/145/101",limit:"Distances compil\xE9es de m\xE9thodes diverses. Ce tableau ne fournit pas leurs erreurs individuelles ; absence d\u2019erreur ne signifie pas pr\xE9cision parfaite."},cf4:{file:"cf4-map.json",name:"Cosmicflows\u20114 \xB7 2023",color:16764561,url:"https://cdsarc.cds.unistra.fr/viz-bin/cat/J/ApJ/944/94",limit:"\xC9chantillon in\xE9gal et incomplet du ciel. Les trous du relev\xE9 ne sont pas n\xE9cessairement des vides cosmiques. Distances individuelles, sans correction des biais ni reconstruction des flux."}},Qm=["Supernova Ia","Tully\u2013Fisher","Plan fondamental","Fluctuations de brillance de surface","Supernova II","Sommet de la branche des g\xE9antes rouges","C\xE9ph\xE9ides","Masers"],rc=i=>10**((i-25)/5),e2=(i,e)=>[rc(i-e),rc(i+e)],Li=i=>i.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");function ac(i,e){if(!yn[i]||e.schema!==1||!Array.isArray(e.rows))throw Error("Format de catalogue inconnu");let t=new Set;return e.rows.map((n,s)=>{let r=i==="cf4",a=r?rc(n[3]):n[3],o=i+":"+(r?n[0]:s);if(t.has(o)||![n[1],n[2],a].every(Number.isFinite)||a<=0||n[1]<0||n[1]>=360||Math.abs(n[2])>90)throw Error("Coordonn\xE9es de catalogue invalides");t.add(o);let c=r?"PGC "+n[0]:n[0],l={id:o,name:c,key:i,ra:n[1],dec:n[2],mpc:a,d:a*Pn,p:ic(n[1],n[2],a*Pn),type:"observed",r:Math.max(.005,Math.min(.08,a*.003)),level:0,raw:n};return l.search=Li([c,i,r?"":n[8]||""].join(" ")),r&&Object.assign(l,{dm:n[3],eDm:n[4],vCmb:n[5],groupPgc:n[6],methods:Qm.filter((h,d)=>n[7]&1<<d),interval:e2(n[3],n[4]),sgl:n[8],sgb:n[9]}),l})}function vu(i,{query:e="",maxMpc:t=1/0,maxError:n=1/0}={}){let s=Li(e),r=i.filter(a=>a.mpc<=t&&(a.eDm==null||a.eDm<=n)&&(!s||(/^pgc[0-9]+$/.test(s)&&a.key==="cf4"?Li(a.name)===s:a.search.includes(s))));return s&&r.sort((a,o)=>+(Li(o.name)===s)-+(Li(a.name)===s)||a.d-o.d),r}var t2=[[-.0548755604162154,-.873437090234885,-.483835015548713],[.494109427875584,-.444829629960011,.746982244497219],[-.867666149019005,-.198076373431201,.455983776175067]],Mu=Math.PI/180,bs=47.37*Mu,Ms=6.32*Mu,n2=[-Math.sin(bs),Math.cos(bs),0],i2=[Math.cos(bs)*Math.cos(Ms),Math.sin(bs)*Math.cos(Ms),Math.sin(Ms)],s2=[-Math.cos(bs)*Math.sin(Ms),-Math.sin(bs)*Math.sin(Ms),Math.cos(Ms)],Yt=[n2,s2,i2].map(i=>[0,1,2].map(e=>i.reduce((t,n,s)=>t+n*t2[s][e],0))),bu=i=>Yt.map(e=>e.reduce((t,n,s)=>t+n*i[s],0));var J9=9.80665*31557600/299792458;var r2=[[-.0548755604,-.8734370902,-.4838350155],[.4941094279,-.44482963,.7469822445],[-.867666149,-.1980763734,.4559837762]];var Su=i=>[0,1,2].map(e=>r2.reduce((t,n,s)=>t+n[e]*i[s],0));function cr(i){let e=2166136261;for(let t of i)e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}var Eu=3261.5638,o2=1e6,Au={E:{shape:3,params:[1,0,.7,1],label:"elliptique",radiusKpc:20},S0:{shape:0,params:[1.6,0,.06,.9],label:"lenticulaire (S0)",radiusKpc:12},dE:{shape:3,params:[.5,0,.75,.2],label:"elliptique naine",radiusKpc:2},dSph:{shape:4,params:[1,0,.8,.03],label:"sph\xE9ro\xEFdale naine",radiusKpc:1},Sab:{shape:0,params:[1.5,1,.045,1],label:"spirale \xE0 grand bulbe (Sa\u2013Sb)",radiusKpc:15},Sbc:{shape:0,params:[1,1,.045,1],label:"spirale (Sb\u2013Sc)",radiusKpc:15},Scd:{shape:0,params:[.45,1.1,.04,.9],label:"spirale \xE0 petit bulbe (Sc\u2013Sd)",radiusKpc:12},Sm:{shape:1,params:[0,1,.06,.7],label:"irr\xE9guli\xE8re magellanique (Sm/Im)",radiusKpc:4},Ir:{shape:2,params:[0,1,.08,.5],label:"irr\xE9guli\xE8re",radiusKpc:2},unknown:{shape:0,params:[1.2,.3,.12,.8],label:"classe inconnue (forme g\xE9n\xE9rique)",radiusKpc:12},dwarfUnknown:{shape:4,params:[1,0,.8,.03],label:"naine de classe inconnue",radiusKpc:1}};function Cu(i,e=""){return/Sph/.test(e)?"dSph":/^dE|dS0/.test(e)?"dE":i==null||!Number.isFinite(i)?"unknown":i<=-4?"E":i<=-3?"dSph":i<=0?e?"dE":"S0":i<=2?"Sab":i<=5?"Sbc":i<=8?"Scd":i<=9?"Sm":"Ir"}function l2(i=""){return/^Sc|^Sd/.test(i)?"Scd":/^Sb|^Sa/.test(i)?"Sbc":/^cE|^E/.test(i)?"dE":/dSph|dE/.test(i)?/Irr/.test(i)?"Ir":"dSph":/Irr/.test(i)?"Ir":"unknown"}function c2(i=[]){let e=i.includes("Plan fondamental")||i.includes("Fluctuations de brillance de surface");return e&&i.includes("Tully\u2013Fisher")?{cls:"Sab",why:"\xE0 la fois un disque en rotation (Tully\u2013Fisher) et une m\xE9thode de type pr\xE9coce : spirale \xE0 grand bulbe ou lenticulaire"}:e?{cls:"E",why:"m\xE9thode du plan fondamental ou des fluctuations de brillance de surface, r\xE9serv\xE9e aux galaxies de type pr\xE9coce"}:i.includes("Tully\u2013Fisher")?{cls:"Sbc",why:"relation de Tully\u2013Fisher, qui mesure la rotation d\u2019un disque : galaxie spirale, inclin\xE9e d\u2019au moins 45\xB0"}:i.some(t=>["Supernova II","C\xE9ph\xE9ides","Masers"].includes(t))?{cls:"Sbc",why:"supernova \xE0 effondrement de c\u0153ur, c\xE9ph\xE9ides ou masers : galaxie \xE0 formation d\u2019\xE9toiles (spirale probable)"}:{cls:"unknown",why:"m\xE9thode compatible avec tous les types (supernova Ia, branche des g\xE9antes rouges)"}}var Ru=(i,e)=>{let t=i*Math.PI/180,n=e*Math.PI/180;return[Math.cos(n)*Math.cos(t),Math.cos(n)*Math.sin(t),Math.sin(n)]},h2=(i,e)=>Math.acos(Math.min(1,i[0]*e[0]+i[1]*e[1]+i[2]*e[2]))*180/Math.PI,Tu=i=>i.ra!=null?Ru(i.ra,i.dec):i.xyz.map(e=>e/Math.hypot(...i.xyz)),wu=i=>i.d??Math.hypot(...i.xyz),Pu=(i,e)=>h2(Tu(i),Tu(e)),oc=i=>Li(i.name||"");function u2(i,e){let t=Pu(i,e),n=wu(i),s=wu(e);return oc(i)&&oc(i)===oc(e)&&t<1?!0:t<.1&&Math.abs(n-s)/Math.max(n,s)<.45}function Iu(i,e){let t=null,n=1/0;for(let s of e)if(u2(s,i)){let r=Pu(s,i);r<n&&(n=r,t=s)}return t}function d2(i,e){let t=cr(i),n=()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296,s=e?n()*Math.SQRT1_2:n();return{inc:Math.acos(s)*180/Math.PI,pa:n()*180}}function Lu(i){let e=/^MESSIER0*(\d+)$/.exec(i);if(e)return["M"+e[1],"M "+e[1],"Messier "+e[1]];let t=/^(NGC|UGC|IC|ESO|DDO|PGC|KK|KKH|UGCA)0*(\d.*)$/.exec(i);return t?[t[1]+" "+t[2],t[1]+t[2]]:[]}var f2=i=>Lu(i)[0]||i;function Du(i,e={}){let t=i.key,n=i.raw,s=yn[t],r,a,o,c;if(t==="ungc")r=Cu(n[6],n[5]),a="type de Hubble T = "+(n[6]??"?")+(n[5]?" ("+n[5]+")":"")+", UNGC",o=n[7]?n[7]/2:null,c=n[7]?"diam\xE8tre UNGC "+String(n[7]).replace(".",",")+" kpc (isophote de Holmberg)":null;else if(t==="mcconnachie")r=l2(n[6]),a="morphologie \xAB "+(n[6]||"?")+" \xBB, McConnachie 2012";else{let u=c2(i.methods);r=u.cls,a="d\xE9duite de la m\xE9thode de distance : "+u.why}e.ungc&&(r=e.ungc.cls,a=e.ungc.clsWhy+" (m\xEAme galaxie dans UNGC)",o=e.ungc.radiusKpc,c=e.ungc.sizeWhy),r==="unknown"&&i.d<10&&(r="dwarfUnknown",a+=" ; dans le Volume local, trait\xE9e comme une naine"),/^canis major$/i.test(i.name)&&(a+=". Nature discut\xE9e : galaxie naine ou surdensit\xE9 du disque galactique ; invisible \xE0 l\u2019\u0153il");let l=Au[r];o||(o=l.radiusKpc,c="taille typique suppos\xE9e pour une galaxie "+l.label+" (non mesur\xE9e dans ce catalogue)");let h=t==="cf4"?"cf4:"+n[0]:t+":"+n[0],d=t==="cf4"&&(i.methods||[]).includes("Tully\u2013Fisher"),f=i.d*o2,p=Ru(i.ra,i.dec),{inc:g,pa:x}=d2(h,d),m={id:h,name:f2(i.name),type:"galaxy",catalogue:t,catalogueRow:i,xyz:p.map(u=>u*f),d:f,ra:i.ra,dec:i.dec,radiusLy:o*Eu,inc:g,pa:x,galaxyClass:r,shapeCode:l.shape,shapeParams:l.params,kind:"Galaxie "+l.label+" \xB7 "+s.name,classSource:a,sizeSource:c,aliases:[i.name,t==="ungc"||t==="mcconnachie"?n[8]||"":"PGC"+n[0],...Lu(i.name)].filter(Boolean),planets:[],motion:[0,0,0],motionStatus:"Position nominale du catalogue ; pas de mouvement propre, de vitesse particuli\xE8re ni d\u2019expansion appliqu\xE9s",note:"Entr\xE9e de catalogue plac\xE9e \xE0 sa distance nominale. La forme 3D est un mod\xE8le de classe ("+l.label+"), pas une image de cette galaxie ; orientation mesur\xE9e quand elle est publi\xE9e, sinon illustrative.",links:[["Catalogue \xB7 CDS/VizieR",s.url],["SIMBAD","https://simbad.cds.unistra.fr/simbad/sim-id?Ident="+encodeURIComponent(t==="cf4"?"PGC "+n[0]:n[8]||n[0])]]};return m.baseXYZ=[...m.xyz],m}var p2=3814697265625e-18,Uu=typeof innerWidth<"u"&&innerWidth<620?512:1024,m2=(Uu/1024)**2,Nu=m2.toFixed(6),Fu=`vec2 texelTan(vec3 viewPos){return viewPos.z<-1.e-6?viewPos.xy/(-viewPos.z):vec2(0.);}
float texelGain(vec3 viewPos){vec2 t=texelTan(viewPos);return pow(1.+dot(t,t),1.5);}
float texelScale(vec3 viewPos){vec2 t=texelTan(viewPos);return pow(1.+dot(t,t),.75);}`;var Ou=`uniform float psfMin;varying float psfS,psfD;
float psfSigma(float size,float soft,float scale){return max(max(mix(.102,.177,soft)*size,.55),psfMin*scale);}
float psfDraw(float size,float sigma){return max(size,7.*sigma+1.);}`,g2=`varying float psfS,psfD;
float erfA(float x){float s=sign(x);x=abs(x);float t=1./(1.+.3275911*x);return s*(1.-((((1.061405429*t-1.453152027)*t+1.421413741)*t-.284496736)*t+.254829592)*t*exp(-x*x));}
float pixelPSF(){vec2 p=(gl_PointCoord-.5)*psfD;float k=.70710678/psfS;return .25*(erfA((p.x+.5)*k)-erfA((p.x-.5)*k))*(erfA((p.y+.5)*k)-erfA((p.y-.5)*k));}`,_2=`varying vec3 light;${g2}
void main(){gl_FragColor=vec4(min(max(light*pixelPSF(),vec3(0.)),vec3(5000.)),1.);}`,c4=.818*10**1.2*p2;var h4=(Math.PI/648e3)**2;var x2=369.82,y2=(i,e)=>(i*=Math.PI/180,e*=Math.PI/180,Su([Math.cos(e)*Math.cos(i),Math.cos(e)*Math.sin(i),Math.sin(e)])),v2=y2(264.021,48.253),p4=v2.map(i=>i*x2);var M2=new Float32Array([2.125378,.7431453,.2305699,.3083628,2.122638,.7438311,.2318426,.3121712,2.119071,.7447793,.2329539,.3159981,2.115159,.7458322,.2340427,.3198568,2.111575,.7468105,.2349055,.3237164,2.107822,.747821,.2359489,.3277258,2.103638,.7489638,.2369488,.3317408,2.098819,.7502872,.2380278,.3357362,2.093933,.7516405,.2390096,.3397572,2.088718,.7530754,.240152,.343826,2.083293,.7545918,.2411076,.3479809,2.077158,.7563427,.2418264,.352203,2.070981,.7581385,.2422256,.3564695,2.064474,.7600076,.2428728,.3607944,2.057659,.7619482,.2437175,.3651633,2.050538,.7639976,.2443848,.3695766,2.043179,.7661217,.245013,.3739832,2.03539,.7683984,.2453966,.3784543,2.027642,.77067,.2457078,.3829688,2.019577,.7730257,.2461226,.3875546,2.01125,.7754505,.2466218,.3921711,2.002587,.7779824,.2470498,.396834,1.993732,.7805762,.2474304,.4015371,1.984672,.7832676,.247449,.4062727,1.975518,.7860041,.2472972,.4110693,1.96609,.7888047,.247314,.4159175,1.956344,.7916927,.247404,.4208356,1.946551,.794588,.2475613,.4257876,1.936978,.7974363,.2475347,.4307935,1.927135,.800371,.2474477,.4357896,1.916918,.8034109,.2474204,.4407865,1.90663,.8064966,.2471494,.4458402,1.896306,.8095866,.2469396,.4509393,1.88606,.8126404,.2468583,.4560409,1.875643,.8157405,.2468228,.4611569,1.865246,.818839,.2467468,.4662396,1.854755,.8219902,.246423,.471343,1.844189,.8251558,.2461763,.4764428,1.83366,.8282936,.246098,.481534,1.823218,.8313981,.2460925,.4866402,1.812698,.8345375,.2459714,.4917767,1.802016,.837745,.2456528,.4969166,1.791258,.8409631,.2454524,.5020487,1.780439,.8441698,.2455456,.5071462,1.769877,.8472815,.2458225,.5121984,1.759319,.8504325,.2456998,.5172477,1.748901,.8535547,.2454489,.5222231,1.738494,.8566688,.2452447,.5271493,1.728165,.859726,.245376,.5320495,1.717819,.8627726,.24566,.53691,1.707311,.8658806,.2458162,.5417979,1.697043,.8689339,.2458039,.5466728,1.686793,.8719844,.2457699,.5514932,1.676537,.8750404,.2456977,.5562402,1.666303,.8780476,.2460433,.5609939,1.655899,.8811152,.2462934,.5657097,1.645736,.8841184,.246469,.5704213,1.635947,.8869975,.2467729,.5750595,1.626182,.8898885,.2468885,.5796656,1.616585,.892713,.2471702,.584219,1.606928,.8955561,.2474413,.588813,1.597235,.8984084,.2477299,.5933446,1.587597,.9012212,.248249,.5978806,1.578098,.9039794,.2488957,.6023754,1.568956,.9066634,.2492286,.6068069,1.559636,.9093657,.249904,.6112329,1.5505,.912028,.2504334,.6156286,1.541985,.9144901,.2511184,.620026,1.533353,.9169534,.2521347,.6244376,1.52456,.9194997,.2528041,.6288645,1.515771,.9220198,.2537199,.6332719,1.507115,.9244993,.2546457,.6376902,1.498894,.9268213,.2558537,.6420827,1.491075,.9290168,.2571273,.6464058,1.483601,.9311071,.2584282,.6506526,1.476286,.9331608,.2596276,.6548967,1.468644,.9352797,.2611381,.6592563,1.4614,.9372627,.2628264,.6635217,1.454667,.9390818,.264633,.6676867,1.447709,.9409865,.2662533,.672047,1.440875,.9428402,.2680147,.6764525,1.434611,.9444988,.2700291,.6806805,1.428737,.9460351,.272108,.6847654,1.422889,.9475602,.274222,.6888314,1.416809,.9491541,.2763344,.6930555,1.411225,.9505735,.2787163,.6972322,1.406193,.9518229,.2811588,.7012549,1.401393,.9529903,.2837298,.7052435,1.39677,.9541576,.2857787,.7093096,1.392202,.9551862,.2890411,.7134276,1.388104,.9561698,.2913636,.7174338,1.384064,.9570713,.2943295,.7213479,1.38012,.9579746,.2969956,.7252357,1.37641,.95876,.3001393,.7290934,1.372798,.9595344,.303105,.7329471,1.369545,.9602129,.3059618,.7367164,1.366596,.9607581,.3092438,.7404325,1.363872,.9612436,.3124578,.7441385,1.360899,.9618108,.3155927,.7479686,1.358335,.9622889,.3184061,.7516951,1.356051,.9625949,.3221004,.755329,1.353998,.9628892,.3252306,.7589199,1.351975,.9631705,.3284001,.7624894,1.350538,.9632523,.3318225,.7658875,1.348922,.9633608,.3355068,.7693438,1.347257,.9635299,.3387319,.7728202,1.345753,.9636499,.3419747,.7762377,1.344411,.9636559,.3458666,.7795593,1.343204,.9636466,.3495126,.7828672,1.341796,.9637389,.3527424,.7862031,1.340743,.9636581,.3566453,.7893603,1.339894,.9635169,.3605427,.7924281,1.338886,.9634292,.3643809,.7955749,1.338343,.963233,.3679223,.7985271,1.337934,.9629339,.3720893,.801479,1.337188,.962773,.375882,.8045275,1.336752,.9625089,.3797813,.8074565,1.336235,.9622535,.3838323,.8103907,1.335817,.9619698,.3878737,.8133988,1.33558,.9616493,.3917473,.8162508,1.335278,.9613067,.3960312,.8191151,1.335125,.960904,.4004677,.8218378,1.334995,.9605474,.4043839,.8244524,1.334948,.9600933,.4090219,.8270671,1.334797,.9597041,.4133202,.8296794,1.334639,.9593013,.417778,.8323387,1.334459,.9589265,.4220195,.8349897,1.334543,.9584447,.4265454,.8375417,1.334429,.9579999,.4312854,.8401628,1.334456,.9575682,.4354835,.8425959,1.334484,.957072,.4403158,.8450697,1.334323,.9566533,.4449376,.8476289,1.334095,.9562888,.4492202,.8501787,1.334083,.9558043,.4540557,.8525631,1.334115,.95533,.4586577,.8549202,1.334031,.9549019,.4631446,.8572407,1.333852,.9544584,.4680677,.8595323,1.333824,.9540041,.4726483,.8618254,1.333445,.9536723,.4770504,.864321,1.333206,.9532787,.4816537,.8667215,1.333211,.9528001,.4863811,.8690264,1.333237,.9523515,.4907468,.8713305,1.333323,.9518667,.4952964,.873623,1.3332,.9514498,.499789,.8759366,1.333085,.9510238,.5043484,.878332,1.333096,.9505811,.5087018,.8806984,1.333051,.9501649,.5129558,.882968,1.332695,.949813,.5174908,.8852627,1.33247,.9494329,.5219184,.8875599,1.332159,.9491054,.5260783,.8898241,1.331629,.9488286,.5303798,.8919497,1.331136,.9485008,.5350791,.8941578,1.330637,.9482418,.5391127,.896507,1.330377,.947925,.5430179,.8987381,1.329958,.9476079,.5473925,.9010126,1.329375,.9473937,.5512315,.9035148,1.328901,.9471532,.5550084,.9059078,1.328487,.9468746,.5589881,.9082195,1.327902,.9466324,.5631089,.9105055,1.327261,.9464451,.5668534,.9127248,1.326611,.9462538,.5706621,.9149469,1.325725,.9461093,.574702,.9173266,1.325082,.945926,.5784125,.9195689,1.324347,.945791,.5819118,.9219339,1.323605,.9456299,.5856928,.9244283,1.322874,.9454893,.5892378,.9268494,1.322277,.945314,.5927333,.9291892,1.321711,.9450888,.5966293,.9314249,1.320943,.9449563,.6002056,.933791,1.320042,.9448643,.6037705,.9361865,1.31923,.9447366,.6074245,.9386233,1.318334,.9446657,.6107661,.9411432,1.317488,.9445716,.6141878,.9436885,1.316701,.9444492,.6177183,.9460933,1.31569,.9443945,.621237,.9484814,1.314704,.9443414,.6246673,.9508864,1.313453,.9443695,.6280719,.9533817,1.312488,.9443098,.6315044,.9559046,1.311648,.9442258,.6348094,.958347,1.310595,.9442278,.6378915,.9609702,1.309558,.9441782,.6414385,.9635216,1.308534,.9441559,.6446731,.9660694,1.307662,.9441025,.6477689,.9685103,1.306479,.9441076,.6512035,.9711595,1.305221,.9441629,.6543578,.9738195,1.304164,.9441871,.6572318,.9764425,1.303052,.9441811,.6605663,.9790709,1.301794,.9442378,.6637066,.9817264,1.300499,.9443322,.666587,.9844224,1.299381,.9443494,.669707,.9870856,1.298209,.9443868,.6727875,.9897746,1.297084,.9444443,.6755321,.9925098,1.295861,.9445221,.678362,.9953319,1.294555,.944604,.6813949,.9981,1.293329,.9446974,.6840808,1.000826,1.292083,.944786,.6868719,1.003568,1.290778,.9448819,.6897645,1.006418,1.289545,.9449995,.6922314,1.009307,1.288341,.9450976,.6948049,1.01214,1.287163,.9451604,.6976522,1.014936,1.285857,.9453072,.7000417,1.017766,1.284507,.9454559,.7025447,1.020589,1.283332,.9455231,.7053401,1.023365,1.282005,.9457069,.7074264,1.026302,1.280808,.9458156,.7098747,1.029174,1.279642,.9458885,.7125859,1.032006,1.2786,.9460092,.7144585,1.034888,1.277261,.9461588,.7169199,1.037831,1.275988,.9462979,.7192888,1.040718,1.274793,.9464702,.7211019,1.043537,1.273787,.9465147,.7236223,1.046317,1.272746,.9466129,.7257151,1.049131,1.271477,.9468296,.7273046,1.052078,1.270258,.9469629,.7295756,1.054895,1.26922,.9470738,.7315332,1.057498,1.268413,.9471401,.7332525,1.060153,1.267227,.9472967,.7351925,1.063028,1.265982,.9475208,.7366404,1.06601,1.26515,.9475873,.7384311,1.068493,1.264288,.9476484,.7403636,1.070974,1.263091,.9478579,.741814,1.073718,1.261975,.9480596,.7431005,1.076645,1.261277,.9480977,.7447783,1.079149,1.260597,.9481701,.7460641,1.081591,1.259154,.948469,.7473535,1.084336,1.258072,.9486282,.7489605,1.086798,1.257795,.9485998,.7500587,1.08904,1.256794,.9487757,.7512619,1.091698,1.255254,.949153,.7520597,1.094596,1.254535,.9492363,.7533527,1.096752,1.254107,.9492214,.7547618,1.098759,1.252888,.9495241,.7553508,1.101417,1.251564,.9498483,.7560401,1.104229,1.25134,.949789,.7572866,1.106057,1.250551,.9499282,.758231,1.10817,1.248877,.9503766,.7587185,1.110956,1.247997,.9505704,.7593898,1.113262,1.247702,.9505821,.760142,1.115174,1.246449,.9508742,.7609361,1.117497,1.24516,.9512082,.761424,1.1199,1.24481,.9512642,.7619001,1.1217,1.243637,.9515537,.7624871,1.123953,1.242307,.9519093,.7628814,1.126347,1.241918,.9519507,.7636178,1.128083,1.240811,.9522465,.7639473,1.130279,1.239274,.9526748,.7642274,1.132817,1.238774,.9527716,.7647439,1.134669,1.238032,.9529448,.7652114,1.136522,1.236232,.9534579,.765429,1.13914,1.235361,.9536828,.7657667,1.141093,1.235271,.9536473,.7663831,1.142612,1.233831,.9540605,.766531,1.144998,1.232204,.9545125,.7668425,1.147378,1.231898,.954545,.7674224,1.14879,1.230739,.9548487,.7678264,1.150899,1.22969,.9551643,.7677907,1.153239,1.228812,.9553936,.768103,1.155167,2.138083,.726435,.3586877,.3110608,2.135287,.727561,.3557657,.314747,2.131243,.7290929,.3524998,.3184389,2.126898,.730633,.3500373,.3221914,2.122908,.7320625,.3476273,.3260526,2.117974,.733866,.3442896,.3301142,2.112176,.7359858,.3403644,.3341998,2.105958,.7381888,.3368526,.3382748,2.099762,.7403416,.3337718,.3423437,2.093007,.7426413,.3308818,.3464208,2.086219,.7449622,.3278788,.3505958,2.079146,.7473665,.3248886,.3548482,2.071832,.7498692,.3216348,.3591746,2.063742,.7526601,.3178118,.3635207,2.055589,.7553827,.3148479,.367876,2.047242,.7581566,.3119506,.3722721,2.03874,.7609941,.3088764,.3766881,2.030048,.7638048,.3066272,.3811892,2.020842,.7667414,.3046475,.3856914,2.01141,.7698969,.3011629,.3902848,2.00168,.7731533,.297556,.3949122,1.991752,.7763944,.2946844,.3995806,1.981453,.779723,.2920372,.4042964,1.971146,.7829725,.2902011,.4090744,1.961038,.7861464,.2885238,.4139236,1.950599,.7895385,.2856607,.4188016,1.939539,.7931459,.2824929,.4237298,1.928312,.7967276,.2800738,.4286791,1.917259,.8001625,.278595,.4336645,1.906624,.8034386,.2774564,.4386999,1.895774,.8068663,.2754537,.4437541,1.884394,.8105313,.2726575,.4488493,1.872864,.8141925,.2703408,.4540151,1.861523,.8177038,.2689532,.4591766,1.850205,.8211563,.2680813,.4643127,1.838948,.8246031,.2670833,.4694109,1.82769,.8281292,.265306,.4745293,1.816415,.8317044,.2630923,.4796788,1.805459,.8351119,.261598,.4848131,1.794672,.8384164,.260627,.4899293,1.783805,.8417213,.2598892,.4950621,1.772881,.8450787,.2587976,.5001829,1.761756,.848519,.2574762,.5052954,1.750779,.8518598,.256708,.5103888,1.740118,.8550887,.2561137,.5154393,1.72958,.8582923,.2554089,.5204667,1.719275,.8614264,.2547105,.5254307,1.708855,.8646239,.2537161,.530349,1.698548,.8677289,.2533107,.5352265,1.688426,.8707748,.2529435,.5400545,1.678377,.8737359,.2532017,.5448975,1.668236,.8767945,.2527648,.5496897,1.658301,.8798088,.2521614,.5544956,1.648592,.8826997,.2521126,.5592383,1.638855,.8856069,.2519849,.5639572,1.629267,.8884501,.2520546,.5686399,1.619668,.8913042,.2520465,.5732973,1.61036,.8940681,.2520755,.577877,1.601002,.8968376,.2521987,.5824015,1.592042,.8994634,.2525714,.5868457,1.583195,.9020773,.2527283,.5913063,1.574549,.9046081,.2531185,.5957056,1.565763,.9072007,.2533073,.6001295,1.556779,.9098154,.2538608,.6045684,1.548289,.9122749,.2544991,.608912,1.539897,.914739,.2547999,.613193,1.531608,.9171119,.2557029,.6174574,1.523573,.919452,.2561815,.6217528,1.515568,.9217006,.2574796,.6260677,1.507736,.9239865,.2578965,.6303641,1.500149,.9261565,.2587427,.6345944,1.492698,.9282372,.2600723,.6388321,1.485287,.9303534,.2609317,.6430455,1.478128,.9323477,.2622545,.6471925,1.471378,.934217,.2636153,.6512679,1.464797,.9360423,.2649141,.6553952,1.457984,.9379292,.2662838,.659636,1.451573,.9396799,.2678179,.6637738,1.445623,.9412528,.2697594,.6677655,1.439399,.9429381,.2713907,.671972,1.433287,.9445982,.2729439,.6762235,1.427877,.9460222,.2747684,.680247,1.422707,.9473428,.2769109,.6841855,1.417648,.9486066,.279289,.6881259,1.412353,.949994,.2811362,.6922195,1.407486,.951233,.2831941,.6962444,1.402929,.9523186,.2858592,.7001466,1.398615,.9533386,.2884567,.7040631,1.39438,.9543825,.2905887,.7079982,1.390467,.9552528,.29349,.7119128,1.386891,.9560607,.2960179,.7157885,1.383688,.9567114,.2990004,.719531,1.380516,.9573918,.3016034,.723308,1.377329,.9580318,.3046458,.7271436,1.374293,.9586095,.3078633,.730941,1.371792,.9590611,.3107549,.7345493,1.369586,.9594156,.3137387,.7381309,1.367411,.9597391,.3169384,.7417649,1.364907,.9601216,.3205229,.7455334,1.36295,.96041,.3234294,.7490741,1.36116,.9605871,.3269451,.7525483,1.359652,.9607002,.3302654,.7559862,1.357976,.9608246,.3339694,.7594562,1.356845,.9608596,.3369534,.7627347,1.355564,.9608441,.3408789,.7660673,1.354428,.9608297,.3443667,.769428,1.353408,.960765,.3480114,.7727685,1.352587,.9606706,.3513614,.7759784,1.351984,.9604465,.3553595,.7791498,1.351058,.9603449,.359092,.7823595,1.350541,.9601009,.3630289,.7853734,1.350087,.959872,.3666347,.7883383,1.349481,.9596162,.3709541,.791393,1.349355,.9592808,.3746475,.7942055,1.34905,.958963,.3786944,.7970841,1.348613,.9586888,.3826957,.8000423,1.348436,.9583112,.3869566,.8029311,1.348329,.9579432,.3909174,.8056823,1.348273,.9575493,.3949858,.8084894,1.34837,.9570754,.3993933,.8111428,1.348269,.9566768,.4036402,.8138606,1.348135,.9562834,.4079314,.8165545,1.347823,.9559797,.411859,.8192868,1.34769,.9555089,.4169119,.8219102,1.347795,.955049,.4211608,.8243693,1.347978,.9545529,.4255336,.8268279,1.347952,.9541023,.4300743,.8293492,1.347728,.9536966,.4347539,.8319527,1.347558,.9532639,.4395424,.8345096,1.347417,.9528961,.4435999,.8369716,1.347484,.9523829,.4484872,.8394032,1.347533,.9518667,.4534557,.8418188,1.34738,.9514829,.4577059,.844282,1.347198,.9510738,.4622938,.8467364,1.346979,.9506432,.4672046,.8491661,1.346527,.9503154,.4717827,.8516624,1.346224,.9499415,.4763801,.8540696,1.346042,.9495351,.4809426,.8563915,1.345563,.9491883,.4857866,.8587881,1.345127,.9488534,.4903901,.8611247,1.344572,.9485625,.4949061,.8634869,1.344078,.9482345,.499608,.865866,1.343618,.9479042,.5042336,.8682991,1.343087,.9476355,.508459,.8706857,1.342475,.9473483,.5131076,.8731373,1.341853,.947063,.517764,.8755122,1.341285,.9468046,.5219957,.8778335,1.340593,.9465594,.526464,.8802903,1.339802,.9463556,.5308108,.8827554,1.338984,.9461667,.53509,.8851314,1.338337,.9459144,.539496,.8874098,1.337579,.9457033,.5438199,.8898283,1.336515,.9456144,.5478321,.8923137,1.335549,.9454841,.5519661,.8947735,1.334486,.9453823,.5561058,.8973004,1.333454,.945318,.5597808,.899774,1.332563,.9451514,.5640558,.902154,1.33166,.9450169,.5680469,.9045245,1.330583,.9449791,.5715925,.9070528,1.329386,.9449469,.5754367,.9096567,1.328336,.9448754,.5792358,.9121177,1.327164,.9448683,.5827575,.9146055,1.326163,.9447771,.586608,.9170263,1.324943,.9447862,.5901102,.9195742,1.323654,.944815,.5936208,.9220818,1.32251,.9447842,.597295,.924589,1.321485,.9447502,.6006494,.9270646,1.320206,.9447885,.604038,.9296697,1.318943,.9447867,.6077731,.9322178,1.317528,.9448889,.6109274,.934776,1.316046,.9449868,.6143219,.9373031,1.314557,.9450582,.6180007,.9398354,1.313193,.9451446,.6211598,.9423238,1.312216,.9451,.6244791,.9447922,1.311056,.9451016,.6278772,.9474558,1.309668,.945237,.6306252,.9502494,1.308369,.9452924,.6338994,.9529146,1.307231,.9452992,.6371832,.9554158,1.305947,.9453682,.6402813,.9578204,1.304407,.9454912,.6435993,.9604151,1.302717,.9456866,.6466375,.9630777,1.301206,.9458451,.6495177,.965742,1.299973,.9458944,.6526598,.9683753,1.298813,.9459399,.6556258,.970992,1.297568,.9460221,.658478,.9736571,1.296145,.9461483,.6614181,.9763756,1.2944,.9463749,.6643121,.9791075,1.292872,.9465416,.6671572,.9817216,1.291549,.9466281,.6701963,.9842404,1.290186,.9467494,.6730098,.9869094,1.288791,.9469163,.6754647,.9897908,1.287427,.9470454,.6782016,.9926415,1.286366,.9470894,.6808882,.995313,1.284947,.9472572,.6834075,.997934,1.283095,.9475271,.6861858,1.000758,1.281349,.9477831,.6887906,1.003529,1.280138,.9479004,.6911941,1.00615,1.27905,.9479617,.6937919,1.008921,1.277615,.9481602,.69605,1.011922,1.276237,.9483539,.6981893,1.014849,1.275088,.9484258,.7008604,1.017422,1.273657,.9486095,.7032559,1.020041,1.272103,.9488526,.7054221,1.022905,1.270754,.9490249,.7076888,1.025831,1.269597,.94916,.709756,1.028626,1.268507,.9492618,.7119572,1.031387,1.267093,.9494579,.7141797,1.03419,1.265704,.9496636,.7162312,1.036999,1.26475,.9497254,.7184282,1.039675,1.263605,.9498752,.7203171,1.042498,1.262216,.950113,.7220512,1.045517,1.260868,.9503082,.7240876,1.048255,1.260157,.9503131,.7261298,1.050674,1.259351,.9503671,.7279705,1.053286,1.257893,.9506534,.7294269,1.056403,1.256628,.9508748,.7309598,1.059292,1.255802,.9509333,.7328116,1.061563,1.254947,.9509931,.7347383,1.063969,1.253689,.9512266,.7361291,1.066824,1.25274,.9514039,.7371652,1.069754,1.252122,.9514046,.7389792,1.072206,1.251474,.9514617,.7403205,1.074601,1.25025,.9516851,.7417117,1.077138,1.249317,.9518269,.7430554,1.079785,1.248624,.9519491,.7438873,1.082355,1.248055,.9519687,.7453661,1.084795,1.247095,.9521424,.7464741,1.087258,1.246073,.9523417,.7475091,1.08962,1.245296,.9524429,.7487934,1.091962,1.244607,.9525697,.749566,1.094443,1.244124,.9526206,.7504845,1.096931,1.243477,.9527166,.7514398,1.09917,1.242797,.952841,.7522089,1.101379,1.241635,.9530806,.7532583,1.103682,1.240928,.9532163,.7539949,1.105892,1.240674,.9532209,.7546987,1.108067,1.240096,.9533209,.7554084,1.110265,1.239401,.9534662,.7560156,1.112513,1.238582,.9536326,.7567792,1.114548,1.237839,.9537899,.7574088,1.116572,1.237385,.9538679,.7579722,1.118658,1.23666,.954052,.758285,1.120889,1.235841,.9542276,.7589557,1.123033,1.235348,.9542997,.7596929,1.124835,1.234908,.9543953,.7600432,1.126798,1.234274,.954536,.7605146,1.129105,1.233535,.9547377,.7606941,1.131177,1.232713,.954898,.7615273,1.132858,1.23197,.9550589,.7621195,1.134716,1.231476,.955196,.7622164,1.136803,1.231056,.9552847,.7625752,1.138944,1.230459,.9554061,.763129,1.140736,1.229803,.9555284,.7638495,1.142329,1.229085,.9557052,.7642143,1.144271,1.228079,.9559872,.7643821,1.146513,1.228081,.9559248,.7649945,1.148048,1.22744,.9560732,.7654132,1.149987,1.826682,.8197929,.3508531,.4121917,1.819358,.8222064,.3485114,.4167662,1.811723,.8246867,.3464225,.4213092,1.80336,.8273498,.3446696,.4257252,1.795462,.829882,.3428412,.4300682,1.787787,.8323712,.3407832,.434553,1.780257,.8347596,.3392967,.4390865,1.772533,.8371998,.3378696,.4436425,1.764858,.8397005,.335698,.4480793,1.756998,.8422475,.333612,.4525311,1.749067,.844765,.3320279,.4569569,1.741421,.8472237,.3301877,.4613396,1.733994,.8496521,.3280015,.4657639,1.726152,.8521116,.32673,.47026,1.718281,.8545594,.3256584,.4748122,1.710131,.8571503,.3239927,.4793359,1.702142,.8596814,.3224446,.4838137,1.694403,.8621138,.321137,.4882992,1.686659,.8645751,.3195602,.4927906,1.678647,.8670783,.3183544,.4972225,1.670824,.8694951,.3174505,.5016666,1.663126,.8719161,.3161365,.5061301,1.655253,.8743939,.3147736,.5105841,1.647408,.8768305,.3137368,.5150383,1.639508,.8792238,.3132926,.5194422,1.631652,.8815579,.3133041,.5238551,1.623651,.8839754,.3129169,.5282849,1.615733,.8864241,.3119744,.5327319,1.608167,.8887543,.3111716,.5371587,1.60078,.8909944,.3107323,.5415668,1.592775,.8933557,.3109157,.5459398,1.584917,.8956908,.3109215,.5503152,1.577328,.8979834,.3105574,.5546845,1.570201,.9001277,.3103026,.5590437,1.563113,.9022061,.3105856,.5633285,1.555629,.9043979,.3109138,.56752,1.54801,.9066516,.3110237,.571755,1.540594,.9088423,.311159,.5759826,1.53337,.9109415,.3116369,.5801725,1.526371,.9129196,.3126521,.584342,1.51923,.9149496,.3135695,.5885171,1.511965,.9170669,.3139885,.5926558,1.505186,.9190526,.3142818,.5967719,1.498481,.9209427,.3153005,.600813,1.491851,.9227601,.3168199,.6047658,1.485217,.9246302,.317829,.608725,1.478594,.9265187,.3186255,.6125905,1.47197,.9283794,.3196974,.616423,1.465594,.9300963,.3214654,.6202232,1.459707,.931669,.3232222,.6240018,1.453376,.9334048,.324671,.6277641,1.447338,.9350607,.3260472,.6314869,1.441473,.9366374,.3276979,.6351249,1.435361,.9382977,.3292482,.6386764,1.429443,.9398578,.3312207,.6421904,1.423829,.9412984,.333481,.645649,1.418484,.9426651,.3356805,.6491053,1.413004,.9441177,.3374284,.65249,1.407673,.945514,.3392947,.6558813,1.402521,.9468161,.3415657,.6592449,1.397241,.9481646,.3437552,.6626119,1.392157,.9494019,.3464718,.6659219,1.387099,.9506451,.3490504,.6691992,1.382354,.9518156,.3514266,.6724164,1.377996,.9528972,.3535445,.6755384,1.373227,.9540147,.3565189,.6787326,1.368686,.9550864,.3592733,.6818354,1.364561,.9559783,.3625837,.684867,1.360283,.9569711,.3653493,.687944,1.356069,.9579499,.3680608,.6910543,1.352144,.9588173,.371026,.6941046,1.348282,.9596402,.3742475,.6972144,1.344286,.9604461,.3780294,.7002775,1.340428,.9612861,.3810705,.703308,1.336868,.9620065,.3844164,.7062561,1.333749,.9626208,.3875157,.7091603,1.330157,.963292,.391444,.7122568,1.326972,.9638475,.3953194,.7152913,1.324332,.9642747,.39886,.7182078,1.32148,.9647953,.4021028,.7212288,1.318521,.9653178,.4056382,.7242675,1.31587,.9655983,.4106671,.7272151,1.3135,.965946,.4142016,.7299819,1.311232,.9662325,.4180413,.7327502,1.308582,.9666591,.4216193,.7357353,1.306473,.966811,.4263235,.7386839,1.304515,.9669697,.4305166,.7414824,1.302735,.9670578,.4348852,.7442135,1.301001,.9672412,.4381751,.7470595,1.299405,.9671755,.4435278,.7499149,1.297939,.9672307,.4472948,.7526664,1.296593,.9671583,.4519779,.7553433,1.295374,.9671113,.4560312,.7580403,1.29435,.9668925,.4612134,.7608474,1.293149,.9668575,.4650988,.763724,1.292167,.9667304,.4692489,.7665029,1.291665,.9664203,.4737971,.769075,1.291336,.9659733,.4791961,.7716653,1.290623,.9657933,.4830765,.7743934,1.290297,.9655001,.486942,.7770696,1.290007,.9650999,.4917606,.7797283,1.289856,.9646529,.4966315,.7824105,1.289682,.9643267,.5003742,.7850403,1.289812,.9638545,.5046708,.7875631,1.28998,.9632963,.509704,.790136,1.290181,.9628124,.5139069,.7926745,1.290524,.9623485,.5174932,.7952013,1.290935,.9617546,.5221639,.7977469,1.291642,.9610973,.5265935,.8001997,1.291989,.9605977,.5305218,.8027302,1.292469,.9600411,.5346225,.8052254,1.293096,.9594126,.5390011,.8077073,1.293565,.958861,.5430845,.8102475,1.294174,.9583032,.5468161,.8127172,1.295217,.9575298,.5514071,.8150285,1.296289,.9567948,.5555314,.8172381,1.297579,.9560014,.5595911,.8193836,1.298462,.9553598,.5633454,.8216477,1.299149,.9546992,.5678694,.824135,1.300153,.9540083,.5717546,.826444,1.301068,.9533477,.5756056,.828829,1.302327,.9525953,.5793519,.8310098,1.303492,.9518182,.5836173,.8332107,1.304869,.9509598,.5880674,.8353639,1.305833,.9504007,.5907676,.8376707,1.306997,.9496087,.5951834,.8399653,1.308233,.9488163,.5993933,.8421411,1.309553,.9480757,.6028423,.844241,1.310636,.9473822,.6065236,.8464962,1.311689,.9466676,.6105009,.8485943,1.312735,.9459519,.6145112,.8507139,1.313995,.9452128,.6181214,.8527381,1.314998,.9445766,.6214703,.8549792,1.316162,.9438326,.6254141,.8570005,1.317389,.9431167,.628893,.8589818,1.318078,.9425893,.632087,.8612675,1.318917,.9420074,.6353812,.8634981,1.319962,.9413295,.6390204,.8655266,1.321154,.9406225,.6425122,.8674852,1.322141,.9400223,.6455515,.8695681,1.323155,.9393991,.6487412,.8716292,1.323902,.9388358,.6521188,.8738269,1.324638,.9383299,.6549633,.8760805,1.325691,.9377264,.6578423,.8781695,1.326715,.9371089,.6609433,.8801709,1.327251,.9366591,.6638201,.8823647,1.327691,.9362503,.6665752,.8845925,1.32818,.9358294,.6693021,.8867142,1.329021,.935283,.6722385,.888663,1.329973,.9347138,.6750752,.8906132,1.330541,.9343112,.6773927,.8927376,1.330662,.9340159,.6799607,.8951378,1.330598,.9337928,.6823585,.8977141,1.331062,.9334489,.6843986,.8998666,1.331723,.9329929,.686968,.9018419,1.332209,.9325725,.689702,.9038703,1.332239,.9323822,.6915008,.9062277,1.332017,.9322497,.6934656,.9086684,1.332006,.9320066,.695907,.9110564,1.332145,.9318088,.6974565,.9133047,1.332326,.9315544,.6994445,.9154294,1.332062,.9313914,.7018345,.9177638,1.331464,.9314081,.7034316,.9201868,1.330942,.9313948,.7050987,.9225458,1.330755,.9312176,.7074068,.9247437,1.330581,.9310994,.7090895,.927003,1.330477,.9309721,.7106557,.9294165,1.330061,.9309171,.7124268,.9321046,1.329712,.9308698,.7139218,.9345517,1.329725,.9306868,.7156965,.9367947,1.329354,.9306212,.7174382,.9392654,1.328359,.9307793,.718802,.9418103,1.327355,.9308852,.7207088,.9443175,1.327029,.9308064,.7224499,.9464983,1.326248,.9309163,.7236608,.948902,1.325158,.9310597,.7254515,.9516312,1.324317,.9311616,.7269181,.9542288,1.323987,.9311562,.727943,.9566185,1.32344,.9311314,.7298001,.9590808,1.322386,.9313048,.7311853,.9617234,1.321253,.9315349,.7322422,.9643119,1.320417,.9316016,.7340413,.9666887,1.319168,.9318492,.7352662,.9691727,1.317861,.9321126,.7365064,.9718389,1.317009,.932199,.7381586,.9743281,1.316209,.9323457,.7390625,.9768201,1.314966,.9326004,.7401987,.9796591,1.31359,.9328737,.7415451,.9824051,1.312696,.9330341,.7425865,.9847901,1.311721,.9331685,.7441269,.9871272,1.310064,.9335559,.7451701,.9899335,1.308417,.9339546,.7460701,.9928069,1.307472,.9341095,.747318,.9952507,1.306499,.9342948,.7483469,.9977227,1.304853,.9346804,.7493751,1.000576,1.303395,.9350147,.7503563,1.003296,1.302482,.9351786,.7514196,1.005764,1.301143,.9354794,.7523838,1.008415,1.299225,.9359787,.7530868,1.011357,1.297757,.9362967,.7542591,1.013944,1.296767,.9365017,.7551432,1.016306,1.295263,.9368551,.7560713,1.019003,1.293436,.9373122,.7569218,1.02199,1.291966,.9376901,.7575075,1.024643,1.290551,.9380055,.7585508,1.027167,1.288689,.9384505,.7596262,1.029738,1.287204,.9388187,.7603503,1.032448,1.285869,.9391531,.7609685,1.035254,1.28448,.9394978,.761644,1.038011,1.283197,.9397898,.7625291,1.040699,1.281774,.9401672,.7629822,1.043325,1.280003,.9405816,.7640915,1.045899,1.278456,.9409628,.7648697,1.048523,1.276759,.9414622,.7649192,1.051327,1.274954,.9418821,.7660771,1.054088,1.27366,.9422133,.7666063,1.056589,1.272547,.9425031,.7670115,1.058997,1.270957,.9428686,.768075,1.061776,1.26916,.9434117,.7679854,1.064635,1.267696,.9437928,.7685212,1.067132,1.266584,.9439975,.7697692,1.069409,1.26552,.9443185,.769721,1.071978,1.26387,.9447833,.7699756,1.074942,1.262182,.9452306,.770515,1.077643,1.260729,.945623,.7709051,1.079888,1.259427,.9459105,.7718927,1.082035,1.257744,.9464126,.7718743,1.084944,1.25656,.9467667,.7718532,1.087787,1.255982,.9469006,.7722284,1.090121,1.254901,.9471573,.7728693,1.0923,1.253079,.9476702,.7731531,1.094912,1.251196,.9482321,.773132,1.097573,1.249917,.9485546,.7737023,1.099768,1.249089,.9487801,.7739075,1.102077,1.247855,.9491408,.7739691,1.104692,1.246978,.9493657,.7743225,1.107061,1.245588,.9497805,.774307,1.109348,1.243897,.9502481,.7746533,1.111712,1.242353,.9506519,.7752004,1.113946,1.241358,.9509823,.7748581,1.116234,1.24027,.9512851,.7750636,1.118714,1.239412,.9515082,.7753774,1.120907,1.237989,.9519603,.7750901,1.1232,1.236236,.9523975,.775921,1.12547,1.235133,.9527473,.7757057,1.127602,1.234113,.9530557,.7756529,1.129917,1.232779,.9534089,.7760824,1.132411,1.231902,.9537194,.7755899,1.13453,1.23054,.9540405,.7764186,1.136501,1.229156,.9544669,.7762699,1.138731,1.227806,.9548898,.7760548,1.141015,1.226893,.9550996,.7766676,1.143064,1.225638,.9554963,.7764309,1.145098,1.22467,.9557238,.7770284,1.14726,1.223041,.956243,.7766815,1.149644,1.221967,.9565401,.7769032,1.151445,1.220748,.9568669,.7772549,1.153518,1.820161,.8029946,.5364536,.4072113,1.817011,.8043168,.5326324,.4110349,1.81298,.8058999,.5288199,.4148342,1.80882,.8075726,.5245018,.4186018,1.80521,.8091469,.5195353,.4223389,1.800694,.8111103,.5133837,.4262885,1.7958,.8131323,.5077661,.4303098,1.791075,.8150503,.5026802,.4344,1.786376,.8169421,.4977779,.4384728,1.781015,.8189218,.4939515,.4424718,1.775433,.8209586,.4902125,.4465571,1.770188,.8229964,.485472,.4507208,1.765652,.8248476,.4804918,.4549031,1.760178,.8270259,.4750304,.4589856,1.754623,.8293026,.4688366,.4630853,1.748961,.831471,.4640294,.4672405,1.7438,.8333958,.4601585,.4713909,1.738738,.8352825,.4563762,.4755936,1.732693,.8374163,.4530386,.47977,1.726661,.8396802,.448374,.4840724,1.720253,.8420995,.4432789,.4883573,1.714093,.8443424,.4391993,.4926725,1.707697,.8466076,.4355935,.4970618,1.701341,.8488464,.4321329,.5014677,1.695286,.8510127,.4285026,.505924,1.689185,.8533004,.4238077,.510384,1.682787,.85556,.420263,.5148198,1.675891,.8577966,.4184145,.519153,1.668617,.8602108,.4159184,.5234752,1.662263,.862376,.4131804,.5278995,1.65599,.8645744,.4098729,.5324045,1.649482,.8667835,.4071542,.536989,1.642914,.8689341,.4051906,.5416142,1.635542,.8713375,.40309,.5461469,1.627938,.8737673,.4014137,.5506163,1.620762,.8761001,.3994361,.5550359,1.614068,.8782468,.3978805,.559452,1.607727,.880322,.3959984,.5639288,1.601207,.8824257,.3943572,.5683818,1.594479,.8845704,.3929221,.5727814,1.587643,.8867736,.3912284,.5772169,1.580751,.8889531,.3899333,.5816537,1.573818,.8910605,.3894712,.5860864,1.567342,.8930372,.3889588,.5904857,1.560704,.8950072,.3889923,.5947578,1.553959,.8971394,.3877314,.5989367,1.547272,.899292,.3860977,.6030724,1.540496,.9013735,.3854333,.6071509,1.533975,.9032479,.3860664,.6112303,1.527763,.9050691,.3863173,.6153256,1.521179,.9070593,.3859898,.619496,1.514076,.9092827,.3848807,.6236346,1.507532,.9112675,.3844907,.6277382,1.501338,.9130079,.3854896,.6317517,1.49489,.9149108,.3856262,.635705,1.488553,.9168558,.3850175,.639563,1.482382,.9187033,.3848886,.6433768,1.476443,.9204197,.3853754,.6470633,1.470521,.9220425,.3867377,.650696,1.464919,.9236853,.3869608,.6542846,1.459117,.9254654,.3864116,.658005,1.453345,.9271116,.3871005,.661615,1.44738,.9287666,.3882704,.6651508,1.441249,.9304893,.3892597,.668698,1.435352,.9321523,.3901514,.6721829,1.429393,.9338786,.3905982,.6756221,1.423636,.9355252,.3912372,.678982,1.418395,.9369566,.3924924,.6823372,1.413289,.9383223,.3939977,.6857132,1.408025,.9397387,.3954677,.6891181,1.403041,.9411211,.396451,.6924448,1.398006,.9425486,.3971365,.6958081,1.393093,.9438818,.398397,.6991624,1.388256,.9451086,.4004866,.7025407,1.383729,.9462271,.4027378,.7058333,1.379218,.9474744,.403665,.7090529,1.374114,.9488834,.4047372,.712363,1.369388,.9500787,.4068123,.7156204,1.365129,.9510391,.4098404,.7187598,1.360523,.9522286,.411619,.7221459,1.355978,.9534783,.4126228,.7256249,1.352079,.9544386,.4145929,.7288824,1.348421,.9552278,.4175462,.7320721,1.344663,.9560681,.4202864,.735325,1.340825,.9570241,.4221196,.7387062,1.337497,.957825,.423984,.7419,1.33426,.9585251,.4265804,.7449792,1.330523,.9593069,.4298402,.7482694,1.327101,.9600437,.432618,.7514612,1.324383,.9605407,.4356997,.754453,1.321964,.9610858,.437421,.7574708,1.319518,.96148,.4407207,.7605067,1.316688,.9620062,.4438393,.7637105,1.313302,.9626591,.4473437,.7671246,1.310209,.9633383,.449722,.7704749,1.30803,.9636731,.452824,.773566,1.306234,.9639117,.4557498,.7765005,1.304553,.964044,.4593864,.7794259,1.302465,.9643075,.4629266,.782475,1.30057,.9645573,.4660309,.7854813,1.298777,.9647485,.4694167,.7884896,1.297292,.9648748,.4725399,.7914411,1.295469,.9650128,.4765391,.7945433,1.29404,.9651567,.4793217,.7974311,1.292621,.9651917,.4831533,.8003781,1.291617,.9651425,.4865974,.8032435,1.290627,.9651007,.4899261,.8061161,1.289591,.9650751,.4932302,.8089663,1.288671,.9649245,.4974325,.8118124,1.287761,.9648387,.5009603,.8146739,1.287505,.9645839,.5042384,.8172583,1.287145,.9643498,.5076181,.8198542,1.286356,.9641276,.5121411,.8227198,1.285865,.9639578,.5152693,.82546,1.285461,.9637422,.5185958,.8281854,1.284713,.9636336,.521872,.8310972,1.284415,.9633054,.5260025,.8338095,1.284589,.9628691,.5298112,.8361543,1.284995,.9623529,.5337307,.8385762,1.285515,.9618578,.5371029,.8408154,1.285465,.9614782,.5410106,.8432518,1.285073,.9611565,.5453522,.845846,1.284216,.9611009,.5484254,.8486081,1.283949,.9607906,.5522869,.851119,1.284121,.9603542,.5561024,.8533293,1.285196,.9595719,.5606855,.8551271,1.286174,.9589138,.5643252,.8570892,1.286335,.9585154,.5677969,.8595265,1.28613,.9581439,.572082,.8621591,1.285859,.9578926,.5753671,.8646892,1.286505,.9573235,.5791024,.8669057,1.287177,.9567425,.5828797,.8691423,1.287767,.9562075,.5864423,.8712119,1.288148,.9556851,.5904955,.8733127,1.288665,.9551233,.5945373,.8753883,1.288923,.9547299,.5976754,.8774897,1.289341,.9542092,.6016009,.8793605,1.28936,.9537829,.6057709,.8815811,1.28924,.9534956,.6089689,.8838333,1.289579,.9530787,.6121012,.885833,1.290283,.952435,.616403,.8876902,1.29075,.9519307,.6200233,.8896448,1.290627,.9517253,.6224204,.8918634,1.290092,.9515042,.6261866,.8941876,1.290228,.9510373,.6304106,.8961074,1.290587,.9506779,.6329149,.8978355,1.291226,.9501311,.6364488,.899406,1.290855,.9498165,.6406561,.9015378,1.29015,.9498024,.6428725,.9038272,1.289736,.9496398,.6457028,.9059708,1.29011,.9491097,.649852,.9076003,1.2905,.9487089,.6526748,.9092594,1.290101,.9485551,.6553714,.9113228,1.289428,.9484276,.658617,.9135931,1.288525,.9484337,.6612175,.9157941,1.288332,.9482055,.6640443,.9175758,1.288573,.9477944,.6674089,.9192348,1.288089,.9476959,.6698083,.9212539,1.287371,.9476554,.6723249,.9234462,1.286659,.9475795,.675172,.9256918,1.286454,.9474301,.677255,.927525,1.285625,.9474303,.6796957,.9295631,1.285004,.9472618,.6831938,.9315071,1.284576,.9471837,.6852263,.9332795,1.283899,.9471863,.6871952,.9353285,1.282851,.9471786,.6903555,.9375118,1.28144,.9474294,.6920264,.9399403,1.280677,.9474362,.6942061,.9419033,1.280655,.9470899,.6977012,.9434286,1.279928,.9471216,.6995293,.9454167,1.278071,.9474828,.7014194,.9479559,1.275955,.947868,.7038323,.9505826,1.275477,.9477735,.7061767,.952291,1.27556,.9474866,.7087748,.9537545,1.274603,.9475339,.7111232,.9559463,1.272792,.947889,.7129401,.958679,1.271599,.9480531,.7148259,.9612215,1.271084,.9480011,.7168566,.9630472,1.270401,.9479172,.7197014,.9647432,1.269102,.9480621,.7220908,.966888,1.267337,.9484368,.7235743,.9693363,1.266218,.9485293,.7259541,.971624,1.265573,.9485027,.7281189,.9737259,1.264682,.9486145,.7296337,.9759316,1.263375,.9487645,.7319949,.9783092,1.262169,.9488862,.7343413,.9805332,1.26138,.9489463,.7360688,.9825553,1.260525,.9489791,.7382626,.9847127,1.258948,.9492461,.7402594,.9873562,1.257829,.9494132,.7418992,.9897283,1.257516,.9492878,.744063,.9916398,1.256632,.9493264,.7462837,.9937881,1.255162,.9495932,.7479712,.9963766,1.254,.9497691,.7496504,.9988559,1.253428,.9497155,.7518673,1.000862,1.25279,.9496994,.7539034,1.002978,1.251444,.9499493,.7553923,1.005595,1.250285,.950105,.7572618,1.008046,1.249961,.9499766,.7594884,1.010049,1.249404,.9499986,.7609112,1.012343,1.248317,.950146,.762651,1.014914,1.24748,.950179,.7647893,1.017299,1.247038,.9501848,.7660328,1.019421,1.246381,.9501667,.7681461,1.021696,1.24556,.9501985,.7702494,1.024188,1.244902,.9503084,.7710984,1.026547,1.244105,.9503324,.7732083,1.028919,1.243477,.9503236,.7751424,1.031299,1.243328,.9502489,.7763203,1.033314,1.243062,.9501116,.7784644,1.035677,1.241842,.9503813,.779387,1.038548,1.241274,.9504151,.7807243,1.040855,1.241762,.9499844,.7835546,1.04243,1.241524,.9499795,.7843035,1.044736,1.239984,.9503423,.7852437,1.047856,1.239816,.9501875,.7872729,1.050037,1.240443,.9498959,.7883154,1.051593,1.239573,.9499847,.7899967,1.054106,1.238624,.9501265,.791385,1.056812,1.239138,.9499096,.7920202,1.058921,1.239045,.9497634,.7937441,1.061094,1.238383,.9498196,.7951364,1.06343,1.238377,.9497299,.7960429,1.065481,1.23838,.9496245,.7970787,1.067655,1.237917,.9496391,.7982956,1.070164,1.237872,.949591,.7989039,1.072317,1.237782,.9494768,.8002999,1.074235,1.237378,.9494562,.8016964,1.07647,1.237329,.9494658,.8017426,1.078719,1.237748,.9491812,.8033278,1.080881,1.237242,.9492914,.8037288,1.083182,1.236853,.9493351,.80444,1.085239,1.237335,.9490175,.8061662,1.086984,1.236797,.9492147,.805798,1.089239,1.236489,.9491777,.8070715,1.091674,1.236669,.9490661,.8076472,1.093488,1.236796,.9489715,.8082092,1.095147,1.236549,.9489228,.8094188,1.097523,1.236292,.9490378,.8090379,1.099691,1.235723,.9491055,.8100412,1.101593,1.235862,.9489619,.811055,1.103238,1.235563,.9490876,.8106898,1.105232,1.235458,.9490244,.8116261,1.107609,1.235231,.9490935,.8116094,1.109567,1.235207,.9490667,.8119453,1.111227,1.234459,.9491485,.8133393,1.113051,1.234126,.9493441,.8123802,1.115366,1.233911,.9493043,.8134085,1.117171,1.234077,.9492232,.8137221,1.118844,1.233433,.9494515,.8133571,1.120749,1.233101,.9494031,.8148137,1.122795,1.232815,.9495651,.8140525,1.12448,1.232133,.9496872,.8148513,1.12641,1.231592,.9498271,.8150579,1.128282,1.231452,.9499001,.8147462,1.130018,1.231621,.9497392,.8158435,1.131771,1.230076,.9503012,.8148262,1.134089,.843762,1.022049,1.241648,1.359695,.8446045,1.020804,1.251492,1.357055,.8500133,1.018484,1.258555,1.353931,.8576644,1.015506,1.265517,1.350421,.8632315,1.013018,1.27377,1.346271,.8658342,1.011024,1.285859,1.340152,.8685556,1.009159,1.296319,1.334159,.8743053,1.006642,1.304329,1.329888,.8846669,1.002812,1.311754,1.325752,.8917586,.9998979,1.319739,1.320512,.8958152,.9978908,1.327675,1.313701,.899941,.9960561,1.333702,1.305648,.905001,.994262,1.336574,1.297845,.9110218,.9919846,1.341404,1.290583,.9167852,.9893342,1.350688,1.283856,.9222055,.9865878,1.361933,1.27781,.9293445,.9832852,1.373626,1.272554,.933774,.9812345,1.380897,1.266258,.9390885,.9797258,1.380193,1.260726,.9446624,.9780987,1.379897,1.254735,.9496083,.9765856,1.380323,1.248697,.9531978,.9748854,1.386594,1.242422,.9589005,.9726224,1.392219,1.237081,.9658894,.9707301,1.390384,1.232665,.9722871,.9683942,1.394684,1.22827,.9757664,.9666027,1.402186,1.223658,.9786037,.9651438,1.408283,1.218985,.9829444,.9633652,1.413119,1.214934,.9859091,.9621293,1.416632,1.211029,.9871759,.9617503,1.416656,1.208852,.9857992,.9620418,1.417823,1.206957,.99313,.9595752,1.42067,1.205307,1.000165,.9569764,1.425699,1.203604,1.007762,.9542599,1.430239,1.201965,1.009986,.9532897,1.433299,1.199835,1.012441,.9522647,1.436224,1.198078,1.01952,.9501889,1.435942,1.197202,1.026147,.9484677,1.433478,1.196533,1.030998,.9466536,1.437164,1.195994,1.033801,.9449499,1.445787,1.195809,1.035705,.9439199,1.450381,1.195221,1.038372,.942768,1.453938,1.194655,1.045248,.9409948,1.451258,1.194269,1.053059,.9383873,1.454086,1.194343,1.055804,.936677,1.462944,1.193977,1.063228,.9345351,1.462302,1.19418,1.071187,.9324921,1.459103,1.19501,1.070472,.9331564,1.454629,1.195049,1.073081,.9312092,1.466235,1.195366,1.076451,.9291592,1.476618,1.195716,1.081009,.9281994,1.472705,1.195992,1.086111,.9266231,1.473297,1.196344,1.091851,.9256846,1.465692,1.196763,1.097949,.9239037,1.465376,1.197556,1.10185,.9226697,1.466112,1.198573,1.101668,.9218958,1.474315,1.199403,1.099445,.9223739,1.476125,1.199887,1.098712,.9234103,1.468015,1.200513,1.102774,.9218827,1.471188,1.201581,1.108725,.9211118,1.461302,1.202853,1.11443,.9200402,1.455116,1.204064,1.114157,.9196712,1.459576,1.20419,1.11278,.9199951,1.460421,1.203133,1.114227,.9198676,1.457425,1.202384,1.117951,.9189437,1.45561,1.201993,1.116028,.9207353,1.443527,1.201177,1.113857,.9209183,1.448106,1.200917,1.111483,.9207928,1.456339,1.201374,1.110296,.9221163,1.446724,1.201316,1.109092,.9227195,1.444295,1.201076,1.108753,.9241084,1.431534,1.20126,1.108491,.9240332,1.433051,1.201209,1.107067,.922972,1.447758,1.200814,1.100522,.9265945,1.431143,1.200697,1.094779,.9283037,1.431125,1.200536,1.089032,.931205,1.419308,1.20129,1.086714,.9309605,1.428555,1.202342,1.085272,.9314046,1.428401,1.201646,1.083671,.9326113,1.421164,1.200981,1.079521,.9347951,1.41175,1.201138,1.072886,.9369728,1.409716,1.201056,1.066713,.9373612,1.424046,1.201068,1.058707,.9410024,1.411552,1.200573,1.053225,.9427071,1.410806,1.199887,1.04674,.9457877,1.399385,1.198912,1.04017,.9465461,1.41122,1.198905,1.033729,.9493101,1.402806,1.198322,1.029739,.950129,1.406445,1.196434,1.022197,.9538703,1.391591,1.195754,1.016447,.954958,1.397748,1.195735,1.009298,.9574366,1.394247,1.195449,1.00355,.9594225,1.391499,1.194727,.9961075,.963034,1.37764,1.194284,.9888877,.9644071,1.385298,1.19531,.98119,.9675834,1.376501,1.195052,.9756323,.9700026,1.368902,1.19391,.9673819,.9734589,1.358958,1.193989,.9625614,.9744077,1.363755,1.193829,.9552491,.9775522,1.354137,1.193081,.9461997,.9813039,1.34362,1.192577,.9384715,.9838646,1.341011,1.193023,.9339881,.9856779,1.33625,1.191145,.9278701,.9879578,1.331681,1.190527,.918656,.9919994,1.318778,1.189622,.912511,.9930264,1.326699,1.188846,.9050525,.9965122,1.314132,1.186268,.8964641,1.000055,1.304329,1.185261,.8896963,1.002414,1.30089,1.183936,.8824369,1.004691,1.299705,1.18281,.875452,1.007677,1.290695,1.183276,.8671498,1.011564,1.276636,1.184551,.8592437,1.014367,1.272158,1.185397,.853969,1.016012,1.271393,1.181496,.8472216,1.018873,1.262914,1.17937,.8410115,1.020889,1.261234,1.178173,.8335879,1.023857,1.253691,1.177688,.8274582,1.026042,1.250103,1.17633,.8234045,1.027496,1.247632,1.175313,.8167775,1.030424,1.238147,1.176753,.8119277,1.032006,1.236756,1.174707,.8050308,1.034394,1.233408,1.176125,.7992137,1.036521,1.22946,1.175526,.7943497,1.038283,1.226332,1.17618,.7900349,1.039628,1.225717,1.175263,.7859368,1.040721,1.226959,1.172685,.7842089,1.041107,1.228216,1.168608,.7809189,1.041933,1.229726,1.167247,.774559,1.044205,1.22595,1.169708,.7662553,1.047197,1.220764,1.173701,.7666832,1.046464,1.226764,1.168977,.7639311,1.047127,1.228294,1.167828,.7601404,1.048655,1.224322,1.169085,.7602246,1.048016,1.230402,1.165599,.7572005,1.048605,1.233475,1.164295,.7523102,1.050059,1.233469,1.164837,.7498215,1.050792,1.233544,1.165164,.7498894,1.050492,1.236307,1.163076,.748278,1.050687,1.239128,1.16182,.7470079,1.050728,1.242456,1.160369,.7444228,1.051522,1.242202,1.161164,.7442558,1.051188,1.246009,1.159102,.742945,1.051231,1.249437,1.15809,.7423799,1.051074,1.252656,1.156711,.742061,1.050813,1.256182,1.155935,.7434596,1.05,1.260118,1.153295,.7397038,1.050988,1.261392,1.154695,.7375547,1.051284,1.26479,1.154114,.7400621,1.049945,1.270669,1.150254,.7417114,1.048962,1.275552,1.147563,.7429294,1.048018,1.281309,1.145282,.7433782,1.047902,1.28114,1.145183,.7422384,1.048274,1.280812,1.147511,.7481818,1.045861,1.287208,1.142397,.7519645,1.044353,1.291015,1.139515,.7540343,1.043406,1.294299,1.137671,.7559924,1.042433,1.298167,1.135926,.7552518,1.042374,1.300934,1.136494,.7598837,1.040582,1.30505,1.132536,.7636784,1.039077,1.308785,1.129879,.768486,1.037155,1.31367,1.126371,.7694216,1.03665,1.315909,1.126015,.7713458,1.035835,1.318324,1.125082,.7764782,1.033835,1.32302,1.120957,.7824312,1.031547,1.328157,1.116229,.7848351,1.030547,1.330981,1.114138,.7866242,1.029776,1.333347,1.112534,.7918481,1.027832,1.337227,1.109401,.7992192,1.025232,1.341278,1.104782,.8048723,1.023187,1.344888,1.101345,.8084899,1.02178,1.348171,1.099366,.8141833,1.019866,1.350362,1.095451,.8190733,1.018119,1.353276,1.091837,.8262416,1.015318,1.359912,1.086391,.8311263,1.01354,1.363137,1.082517,.8371007,1.011474,1.366014,1.078934,.8433564,1.009176,1.37036,1.075265,.8498844,1.007028,1.372416,1.071258,.8567343,1.004557,1.376721,1.066976,.8638379,1.002059,1.380548,1.063108,.8702686,.9999365,1.382636,1.059296,.8773403,.997394,1.386999,1.05528,.8854534,.9945933,1.390851,1.050818,.8924189,.9924403,1.391668,1.046914,.8990478,.990087,1.39546,1.043221,.9073616,.9872511,1.399072,1.038041,.9170631,.9841247,1.401474,1.03225,.9249302,.981454,1.404763,1.028533,.9307052,.9796926,1.405207,1.025405,.9394563,.9768126,1.407967,1.020311,.9505439,.9729717,1.413366,1.014678,.9577037,.9708862,1.412942,1.011632,.9637339,.9688882,1.414977,1.00961,.9742742,.9654474,1.418024,1.005373,.9845416,.9624718,1.417266,1.001131,.9913343,.9600578,1.421177,.9986732,.9995396,.9574399,1.422948,.9955079,1.01029,.9543095,1.422302,.9915183,1.018911,.9514011,1.425726,.9887364,1.025364,.9495142,1.425417,.9866729,1.035994,.9462678,1.426272,.9829872,1.04742,.9425974,1.428988,.9789547,1.054819,.9404709,1.428263,.9769236,1.064054,.9376911,1.428609,.9752661,1.076143,.9340594,1.428983,.9721099,1.086902,.9307306,1.43028,.9696702,1.096581,.927787,1.430935,.9686099,1.106971,.9249055,1.428886,.966936,1.117244,.9216184,1.431199,.9645521,1.126587,.9187544,1.432056,.9625707,1.135504,.916249,1.430616,.961271,1.144413,.9134325,1.432283,.9603562,1.154304,.9105045,1.432164,.9592315,1.165378,.907237,1.431923,.9583275,1.176841,.9037955,1.43226,.9580237,1.187442,.9007313,1.431396,.9581765,1.198295,.8975938,1.430516,.9578941,1.21154,.8935296,1.431776,.9569554,1.220514,.8908546,1.431848,.9566106,1.227421,.8889169,1.430706,.9571492,1.236629,.8859323,1.433155,.9567715,1.24908,.8822472,1.432998,.9558907,1.255658,.8802387,1.433524,.9559591,1.267441,.8765889,1.434981,.9565083,1.279406,.873469,1.430653,.9567639,1.294991,.8686923,1.432081,.9571827,1.303895,.8657006,1.435496,.9571008,1.311458,.8640737,1.429341,.9581763,1.317538,.8618845,1.433125,.959088,1.328328,.858655,1.433345,.9588374,1.338345,.8561134,1.429024,.9592347,1.348324,.852858,1.431888,.9610617,1.361359,.8494877,1.42689,.9624888,1.373058,.8459999,1.426991,.96287,1.376802,.844536,1.430467,.9631493,1.382565,.8432977,1.425763,.9639808,1.388337,.8416222,1.425367,.9646748,1.396049,.838938,1.429245,.9658393,1.406399,.8367909,1.420039,.967127,1.423666,.831748,1.419146,.9694134,1.420094,.8327988,1.419257,.9699756,1.422234,.8322436,1.418453,.9705013,1.426683,.8305711,1.421923,.9713853,1.429668,.8303866,1.414959,.971959,1.435457,.8288119,1.413512,.9747865,1.450856,.824557,1.410317,.9771835,1.445909,.8262556,1.408057,.9768344,1.44424,.8266446,1.409118,.9783299,1.444308,.8269911,1.405487,.9789664,1.448576,.8259736,1.402998,.9792409,1.453902,.8245307,1.401609,.98354,1.457027,.8246883,1.390844,.9854855,1.45391,.8252625,1.394334,.9853052,1.451459,.8263698,1.390583,.9874148,1.446976,.8277542,1.390072,.9885665,1.451983,.8267176,1.385596,.9898154,1.451824,.8277598,1.37574,.9930707,1.445389,.8296371,1.376093,.9947013,1.109025,.9808742,.8684225,1.016991,1.102804,.9830616,.8650732,1.020844,1.100102,.9841522,.8622246,1.024145,1.097599,.9850592,.8606118,1.026547,1.095406,.9856135,.8615787,1.028448,1.093704,.9860092,.8626709,1.030201,1.090484,.9869978,.8623603,1.031781,1.088823,.9876778,.8605139,1.033741,1.089211,.9877588,.8585683,1.035674,1.087539,.9884679,.8564686,1.036754,1.085414,.9892373,.8551044,1.037513,1.084219,.9895133,.855888,1.038272,1.082951,.9897278,.8574985,1.038923,1.082431,.9899994,.856338,1.039702,1.082301,.9902395,.8543413,1.040634,1.081481,.9906598,.8525942,1.041289,1.080634,.9910895,.8508324,1.041817,1.08086,.9910139,.8509136,1.042209,1.081865,.9906381,.8516771,1.04263,1.082467,.9905218,.8510569,1.042556,1.084031,.9902091,.8495478,1.042466,1.084794,.9901152,.8482345,1.042238,1.086867,.9896527,.8467102,1.042164,1.090538,.9885156,.8471648,1.042208,1.092914,.98776,.8476536,1.041996,1.094546,.9873796,.8466153,1.041717,1.095622,.9871289,.8459303,1.04146,1.099354,.9861094,.8450385,1.041703,1.101288,.9854911,.8454699,1.041852,1.103714,.9847036,.8461275,1.042572,1.103095,.9848306,.8466905,1.043334,1.108639,.9832074,.8464476,1.044451,1.111628,.9822886,.8467465,1.045285,1.114347,.9812952,.8485805,1.04602,1.115575,.9806851,.8510091,1.046618,1.117851,.9798507,.8525718,1.047061,1.125307,.9776406,.852509,1.047971,1.131572,.9758403,.851894,1.048784,1.137079,.9741774,.8521509,1.049443,1.140058,.9731892,.8531672,1.050089,1.143854,.971792,.8558325,1.05086,1.148256,.9700399,.8602253,1.051749,1.153433,.968174,.8634638,1.0527,1.160853,.9657214,.8659095,1.05409,1.163996,.9645169,.8685871,1.055053,1.167698,.9633328,.869415,1.055985,1.176618,.9606652,.8695743,1.05746,1.178407,.9596646,.8742178,1.058136,1.183151,.9578511,.8782132,1.059105,1.18831,.9561331,.8800404,1.060223,1.19551,.953669,.8832487,1.061552,1.19855,.9521394,.8894493,1.062405,1.205041,.9498697,.8928172,1.063573,1.209589,.9484644,.893347,1.064726,1.212721,.947334,.8953208,1.065827,1.218943,.9451264,.8988689,1.067206,1.220927,.9440805,.9033864,1.067985,1.223362,.9428143,.9087584,1.069035,1.224921,.9417203,.9150076,1.070044,1.231083,.9401399,.9125172,1.071484,1.238715,.9377977,.9132448,1.073325,1.239309,.937193,.9174849,1.074338,1.236722,.9376141,.9209316,1.07459,1.238636,.9365276,.9260581,1.075303,1.243339,.9347624,.9296962,1.076637,1.243344,.9347583,.929722,1.077623,1.241967,.9348836,.9325347,1.07855,1.239182,.9353406,.9362109,1.079332,1.23567,.9360989,.9390381,1.080125,1.235299,.9354085,.9469707,1.08116,1.23773,.9351727,.942147,1.082853,1.238168,.9346198,.9463344,1.08436,1.234468,.9353566,.9499305,1.085245,1.227513,.9371815,.9523333,1.085734,1.219796,.9386501,.9605101,1.086324,1.213326,.940752,.9587403,1.087688,1.209824,.9413478,.9631495,1.089699,1.207369,.941923,.9646825,1.0908,1.204568,.9422363,.9698272,1.091871,1.199742,.9436596,.9699389,1.093336,1.193255,.9452564,.9732225,1.094637,1.186725,.9467206,.977945,1.095498,1.179805,.9486523,.9791887,1.096193,1.172636,.9501692,.9852704,1.097253,1.163979,.9528351,.9843547,1.098579,1.155053,.9549063,.99012,1.100507,1.145769,.9576942,.9898434,1.101866,1.138209,.9590164,.9990062,1.102418,1.128791,.9622605,.9946035,1.103395,1.120277,.9639954,1.002488,1.104611,1.111597,.9666595,1.001658,1.105262,1.103137,.9683657,1.009668,1.106278,1.09275,.9718328,1.005908,1.10768,1.083156,.9740429,1.012267,1.109392,1.073073,.9772268,1.010418,1.110918,1.06414,.9793868,1.015323,1.112385,1.053828,.9826294,1.013568,1.114294,1.045289,.9848292,1.016923,1.115553,1.036029,.9874777,1.017952,1.116601,1.02644,.9902543,1.018685,1.117677,1.016728,.9928597,1.021473,1.119293,1.007793,.9955358,1.021274,1.120245,.9989268,.9977379,1.025569,1.121703,.9878629,1.001238,1.023474,1.122762,.9783218,1.003611,1.02806,1.123694,.9682968,1.006691,1.027072,1.123606,.9583628,1.009533,1.028168,1.123664,.9494363,1.011757,1.032427,1.123541,.9402071,1.014367,1.033751,1.123588,.9320138,1.016823,1.03355,1.126,.922958,1.019898,1.029751,1.128765,.9133711,1.02263,1.030917,1.130497,.9051582,1.024723,1.034371,1.129353,.8968376,1.027255,1.03379,1.129246,.8896887,1.02913,1.036271,1.129935,.8808206,1.032133,1.032628,1.132254,.8727382,1.034593,1.032062,1.1345,.8651568,1.036795,1.032574,1.136173,.8563044,1.039623,1.030631,1.138707,.8500358,1.041201,1.033459,1.136966,.8436599,1.042676,1.037614,1.136472,.8374863,1.044284,1.03987,1.13606,.8302662,1.046591,1.038275,1.138532,.8238676,1.048284,1.040345,1.139801,.8181159,1.049716,1.043097,1.13925,.8131611,1.051083,1.04415,1.139275,.8068303,1.05279,1.045875,1.141522,.7993365,1.055277,1.043306,1.145302,.7940215,1.056756,1.044305,1.145813,.7921861,1.056652,1.050748,1.142597,.7883579,1.057441,1.054197,1.142225,.7815105,1.059706,1.051924,1.14596,.7805761,1.059504,1.056679,1.143098,.7769849,1.060235,1.060008,1.143322,.7713055,1.061937,1.059878,1.145529,.7636763,1.064537,1.056591,1.150095,.7630899,1.064103,1.062609,1.147195,.761119,1.064253,1.066925,1.145389,.7592117,1.064506,1.070044,1.143874,.7559437,1.065355,1.07125,1.144794,.7537247,1.065611,1.075248,1.143579,.7496103,1.066802,1.075566,1.145357,.745503,1.068033,1.075474,1.14776,.7456335,1.067501,1.08035,1.145947,.7462768,1.06691,1.084311,1.143426,.7439238,1.067381,1.08658,1.143563,.7441845,1.066872,1.090854,1.142296,.7424472,1.067187,1.092848,1.142216,.7390965,1.068205,1.092626,1.143876,.739938,1.067338,1.09874,1.141568,.740739,1.06681,1.101612,1.140085,.7413217,1.066525,1.102722,1.139516,.7444767,1.065002,1.108518,1.136176,.7426174,1.0654,1.110044,1.137339,.739701,1.066304,1.109683,1.138909,.7441894,1.064312,1.1162,1.134899,.7470156,1.062926,1.1216,1.132363,.7497366,1.061888,1.123875,1.129654,.7477801,1.062359,1.124973,1.131503,.7480238,1.06199,1.127904,1.131709,.7533297,1.060023,1.131764,1.127614,.7583193,1.058041,1.136711,1.124285,.7614878,1.056581,1.14184,1.121936,.7610167,1.056689,1.142164,1.121992,.75947,1.05694,1.144223,1.122425,.7656531,1.054335,1.15182,1.116854,.7719276,1.05196,1.156871,1.111796,.7745896,1.050849,1.160038,1.11013,.7763671,1.050077,1.16246,1.11051,.7804795,1.048588,1.165098,1.108584,.7899401,1.045203,1.170772,1.102145,.7970316,1.042558,1.176091,1.097638,.8005005,1.041216,1.179166,1.095549,.801387,1.040762,1.181058,1.094771,.8091254,1.037755,1.188056,1.088428,.8168004,1.034786,1.194861,1.082077,.8203613,1.03333,1.198806,1.079016,.8231078,1.03221,1.201814,1.077336,.8306694,1.029495,1.206441,1.07305,.8411768,1.025842,1.211682,1.067087,.8475001,1.023612,1.215159,1.063789,.8509332,1.022255,1.21849,1.062032,.8578788,1.019641,1.223926,1.056761,.8678814,1.016049,1.230054,1.049013,.8732934,1.014116,1.23327,1.044737,.8754771,1.013149,1.236417,1.042153,.8827685,1.010565,1.240548,1.036888,.892923,1.007008,1.245882,1.029198,.8989314,1.004706,1.250986,1.024471,.9030839,1.003214,1.253537,1.022045,.9109375,1.000674,1.255581,1.017257,.9209756,.9970969,1.261453,1.011108,.9271355,.9948486,1.265586,1.007509,.9326473,.9930117,1.267551,1.004041,.9410478,.9900271,1.27238,.9990291,.9480436,.9876411,1.275415,.9949929,.9537996,.9856798,1.277895,.9914991,.9626501,.9824536,1.283791,.9866956,.9714826,.9795548,1.286499,.9822437,.975964,.9781121,1.287594,.9797839,.9798326,.9764532,1.292636,.9767623,.9891591,.9732107,1.297292,.9706362,.9951116,.9711501,1.300176,.9665332,.9965879,.9703303,1.30395,.9649782,1.003142,.9680161,1.307576,.9614687,1.013105,.9647118,1.310969,.957013,1.019846,.962296,1.315049,.9549091,1.025345,.9604589,1.317057,.9533297,1.034204,.9576475,1.318819,.9500529,1.040641,.9551332,1.32477,.9467646,1.045473,.9532012,1.32968,.9448441,1.054819,.9503152,1.330748,.9432711,1.059293,.9486706,1.333867,.9427301,1.061625,.9475989,1.337616,.9419285,1.068258,.9450579,1.343253,.9391302,1.07493,.9425295,1.348653,.9368778,1.078822,.9411641,1.35072,.9369456,1.086573,.9386016,1.353277,.9367242,1.094691,.9358965,1.356169,.9355614,1.101034,.9333983,1.362241,.9341417,1.110586,.9300452,1.367329,.9329046,1.114198,.928886,1.368175,.9327364,1.115468,.9280796,1.372424,.9331734,1.119303,.9262846,1.378914,.9312004,1.127427,.923331,1.384247,.9288281,1.132046,.9214541,1.389239,.9296501,1.139573,.91929,1.388511,.9320489,1.150462,.9158401,1.390622,.9320424,1.159137,.9125677,1.397494,.9310586,1.158241,.9124464,1.401335,.9314814,1.159143,.9120051,1.403048,.9318201,1.161697,.9104192,1.411239,.9312371,1.170728,.9072558,1.415981,.9310286,1.178326,.9052483,1.413494,.9323593,1.1839,.9028812,1.420531,.9337485,1.191537,.9006577,1.420066,.933507,1.192982,.8995836,1.426453,.9331931,1.19173,.8992208,1.433733,.9339863,1.197425,.8980947,1.428118,.9352716,1.198156,.8969244,1.437559,.9347417,1.205696,.8942207,1.442139,.9349161,1.214117,.8921874,1.437483,.937281,1.211769,.8923411,1.442874,.9383633,1.211198,.8920419,1.44752,.9376789,1.21642,.8903628,1.448777,.937811,1.215119,.8901319,1.454895,.9391776,1.221659,.8888695,1.448142,.941111,1.224439,.8876886,1.451652,.9419111,1.221161,.88788,1.459409,.9410165,1.219608,.8886003,1.456847,.9416318,1.221012,.8883169,1.455522,.9438893,1.226083,.8867968,1.455646,.9452803,1.232391,.8853007,1.451892,.9461652,1.225042,.8862977,1.463654,.9461147,1.218807,.8890213,1.455036,.9472185,1.219207,.8888515,1.455541,.9475228,1.224772,.886843,1.459049,.948572,1.320119,.915288,.8965203,.796441,1.314964,.9170925,.8938246,.7999544,1.310393,.9185495,.8928509,.8032928,1.308712,.9192261,.8910998,.8067215,1.305581,.9206301,.8864097,.8100245,1.301035,.9226213,.8800706,.8134792,1.296607,.9247827,.8716994,.8168553,1.292542,.92677,.8639858,.8201124,1.289542,.9280413,.8602254,.823299,1.286097,.9295228,.855692,.8264532,1.28175,.9308422,.8554253,.8293986,1.279548,.9314536,.855852,.8323749,1.277655,.9324146,.8519072,.835157,1.27301,.9347806,.8421456,.8377763,1.268482,.9369514,.8339757,.8405205,1.265158,.9386653,.826786,.8433685,1.263697,.9399483,.8183802,.846317,1.26132,.9404087,.820819,.8491189,1.25864,.9406889,.8259347,.8517714,1.254827,.9426586,.8176505,.8542858,1.251578,.9446961,.8070328,.8569077,1.247441,.9467413,.7989566,.8594506,1.2429,.9488259,.79168,.8620309,1.240874,.9490903,.7950255,.8649405,1.240015,.9488645,.7997917,.8678727,1.234837,.9512072,.7918323,.8704288,1.22971,.9537548,.781694,.8729992,1.225385,.9557183,.7749777,.875594,1.223847,.9563714,.7730365,.8783956,1.222427,.9564287,.7766524,.88119,1.218231,.9578642,.7747866,.8837678,1.213307,.9601042,.7670965,.8861403,1.210067,.9617977,.7598626,.8884537,1.210389,.961784,.7590485,.8909355,1.20931,.9616963,.7630947,.8932568,1.20563,.9629013,.7619966,.8953554,1.200891,.9648247,.7568959,.8973747,1.196862,.9665268,.7518992,.8993424,1.195653,.9669277,.7514895,.9015505,1.195104,.9667957,.7544137,.9039177,1.191847,.967778,.7542727,.9062201,1.18865,.9688634,.752934,.9085723,1.185674,.9702179,.7482818,.910845,1.182928,.971038,.748242,.9129079,1.181162,.9713236,.7506136,.9149494,1.179827,.9715946,.7518612,.9169708,1.177362,.9723666,.7514727,.9189201,1.174083,.9734318,.7505751,.9207943,1.171484,.9741801,.7508161,.9226986,1.168397,.9747575,.7541874,.9243631,1.16516,.975613,.7552433,.926112,1.16226,.9764328,.7556613,.9279395,1.160297,.9770001,.7558222,.9298736,1.159408,.9771126,.7573256,.9316755,1.158652,.9770177,.7604934,.9332934,1.155997,.9776146,.762397,.9345533,1.153125,.9783842,.7632301,.9357447,1.150612,.9789745,.7647836,.9369373,1.148231,.9793195,.7683767,.9382084,1.144919,.9802126,.7692828,.9394641,1.141963,.9810553,.7696374,.9409514,1.138512,.9817558,.772862,.9424853,1.136242,.9818747,.778369,.9439418,1.13377,.9825829,.7786325,.9453672,1.132346,.98297,.7789911,.9467972,1.130431,.9834374,.7799982,.94789,1.128565,.9835665,.7842146,.9490279,1.126343,.9836459,.7899714,.9501906,1.123118,.9847358,.7886718,.9513398,1.119767,.9854792,.7911732,.9525694,1.11648,.9861678,.7940322,.9538942,1.113532,.9867409,.7970375,.9552907,1.111556,.9868959,.8013196,.9563005,1.109513,.9873883,.8024566,.9571562,1.107633,.9876366,.8055346,.9579167,1.10477,.9882342,.8080444,.9589782,1.101796,.9886679,.8125053,.9600674,1.098637,.9892805,.8157407,.961072,1.09551,.9900164,.8176563,.9622109,1.09247,.990692,.819917,.9634728,1.089986,.9910112,.8240684,.9646708,1.087982,.9909754,.8303233,.9658173,1.085075,.9919221,.8295058,.9669595,1.08222,.9924718,.8324682,.9676863,1.079169,.992924,.8369723,.9684158,1.076164,.9931026,.8440537,.9694075,1.072874,.9940327,.8445249,.9701305,1.071812,.994076,.8472236,.9706059,1.070564,.994029,.8513647,.9714731,1.069222,.9938095,.85749,.9724006,1.067141,.9943302,.8584602,.9736499,1.064741,.9946804,.8620585,.974698,1.062835,.9949543,.864957,.975455,1.060512,.995037,.8709793,.9765506,1.056919,.9960629,.8713975,.9775745,1.053616,.9966098,.8757062,.9786506,1.050905,.9970087,.8797372,.9794179,1.048732,.9971402,.8848318,.9804262,1.047122,.9974943,.8860671,.9803937,1.045873,.997439,.8902908,.9803377,1.044161,.9973479,.8962345,.9808249,1.042723,.9974327,.8996302,.9814622,1.041514,.997625,.9012841,.9826026,1.040313,.9978035,.903053,.9836303,1.038947,.9975633,.9094555,.9848165,1.037077,.997932,.9113093,.9858946,1.034931,.9984583,.9124139,.987148,1.034662,.9981867,.9158967,.9874764,1.034279,.9978734,.920128,.9878768,1.033377,.9977978,.9235328,.9884318,1.03251,.9978307,.9257599,.9889573,1.03155,.997774,.9291497,.9896954,1.031252,.9974931,.9328089,.9896621,1.029919,.9976504,.9351757,.9903716,1.028649,.99766,.9388198,.9914363,1.027881,.997688,.9408048,.9924173,1.027377,.9976065,.9430936,.993371,1.02749,.9973098,.9457016,.9937503,1.027108,.9970685,.9492162,.9941706,1.026931,.9967305,.9530876,.9943703,1.025979,.996738,.9558144,.995363,1.026596,.9962819,.9585165,.994876,1.027079,.9956671,.9631854,.9946102,1.027329,.9951412,.967657,.9947498,1.026859,.9951937,.9685221,.9953206,1.02614,.9951354,.9712157,.9963794,1.026561,.9945826,.9754522,.9972194,1.027215,.9942446,.9768745,.9977099,1.027772,.9938582,.9790629,.998364,1.031372,.9922635,.984259,.9969874,1.032098,.9918186,.9865276,.9977063,1.032434,.9915123,.988573,.9983375,1.03259,.9911753,.9914499,.9992419,1.035363,.9900698,.9942353,.99922,1.037465,.9892234,.9964303,.9994155,1.03825,.9887328,.9989804,.999557,1.038101,.9884471,1.002248,.9995495,1.038603,.9879246,1.005946,.9995483,1.039303,.9874999,1.008091,.999585,1.04127,.9867264,1.009962,.9992024,1.042013,.985974,1.015227,.9989749,1.042677,.9855547,1.017427,.9990049,1.043453,.9854189,1.016485,.9998593,1.044811,.9845397,1.021197,.9998814,1.047074,.9835396,1.024439,.9999027,1.049692,.9827554,1.024499,.9993454,1.05245,.9816801,1.027029,.9998954,1.055187,.9804881,1.030778,.9997526,1.056443,.9802172,1.029762,1.000583,1.056552,.9800868,1.030735,1.001676,1.05767,.9793504,1.034738,1.001147,1.058201,.9789304,1.037334,1.000105,1.061153,.9777083,1.040745,.9980664,1.061369,.9772754,1.044399,.9976711,1.060217,.9775637,1.044934,.9985436,1.062628,.9767523,1.045874,.9994395,1.066662,.9753446,1.047938,.9992552,1.070515,.9742963,1.046979,.9994547,1.072103,.9736737,1.04847,1.00049,1.072831,.9731787,1.051228,1.000682,1.074955,.9725036,1.051661,1.000055,1.077841,.9712085,1.055992,.9983718,1.078808,.9705939,1.059233,.9975486,1.078654,.9707533,1.058107,.9985747,1.080387,.9701125,1.059352,.9994231,1.083448,.9691276,1.060096,.9993012,1.086518,.9681517,1.060723,.9987215,1.089268,.9670454,1.063583,.9987717,1.091009,.9664688,1.064169,.9984929,1.090252,.9666991,1.064118,.9990225,1.091158,.9659631,1.068741,.9982173,1.092609,.9654553,1.069498,.9971883,1.095771,.9644586,1.07006,.9966579,1.098027,.9636207,1.071717,.9981149,1.099115,.9634042,1.070659,.9985896,1.101813,.9625655,1.07102,.9985296,1.10571,.9610168,1.074886,.9976083,1.106245,.96089,1.074568,.9974606,1.104576,.9612135,1.076276,.997355,1.10545,.960677,1.079018,.9974913,1.108942,.9596362,1.079045,.9964118,1.111325,.9588913,1.079406,.996788,1.114416,.9577675,1.081437,.9974134,1.115816,.9576339,1.078638,.9985626,1.117269,.9570381,1.080264,.9982437,1.119915,.9557772,1.08496,.9970643,1.12236,.9551137,1.084335,.9961596,1.123545,.9547602,1.084346,.9970495,1.1239,.9545048,1.085831,.998112,1.125757,.9541908,1.083475,.9985597,1.127486,.9533994,1.086223,.9978403,1.128015,.9529392,1.089223,.9972172,1.129245,.9525875,1.089085,.9973779,1.13314,.9513982,1.089397,.9983407,1.137603,.9501345,1.088772,.9990196,1.142418,.9487259,1.088547,.999895,1.145746,.9477999,1.087923,1.000836,1.146741,.9474446,1.088512,1.000939,1.149202,.9462433,1.093166,.9995815,1.150926,.9459041,1.091448,.9997764,1.150062,.9462143,1.090919,1.001373,1.150493,.9459561,1.092206,1.003083,1.154166,.944977,1.091091,1.00203,1.158501,.9432979,1.094959,1.001052,1.161205,.9425086,1.094816,1.002621,1.162517,.9425888,1.090158,1.004918,1.164709,.9416726,1.092779,1.005722,1.167978,.9406349,1.093433,1.005034,1.172243,.9393346,1.093753,1.00472,1.174531,.9385113,1.095172,1.006172,1.175697,.9385079,1.091772,1.008335,1.180809,.9369815,1.091841,1.009091,1.181831,.9364589,1.094008,1.009128,1.183521,.9358011,1.095546,1.008591,1.186925,.9349121,1.094329,1.009853,1.187194,.9350259,1.09241,1.012568,1.190533,.9339249,1.093485,1.013325,1.195751,.9324361,1.092866,1.01303,1.197908,.931568,1.095115,1.013087,1.197867,.9317917,1.09302,1.015725,1.200362,.9313113,1.090431,1.017494,1.205651,.9293881,1.093907,1.017047,1.209526,.9283308,1.092972,1.017025,1.211933,.9277197,1.091936,1.019045,1.211646,.9279587,1.090416,1.022034,1.211791,.9278925,1.090645,1.021548,1.21636,.9261329,1.09462,1.020141,1.215908,.9267109,1.090226,1.023418,1.219976,.925795,1.08732,1.026764,1.22781,.923131,1.090641,1.025613,1.231802,.9223427,1.086694,1.025866,1.228306,.9232902,1.087604,1.029474,1.224989,.9242846,1.087521,1.029644,1.230498,.9227546,1.086455,1.027752,1.230122,.9227483,1.087625,1.031522,1.233048,.9226417,1.080066,1.035846,1.241544,.9195815,1.085362,1.032684,1.242231,.9195132,1.084015,1.034015,1.230285,.9236964,1.077753,1.039152,1.231081,.9228012,1.084277,1.037042,1.239432,.9205168,1.082316,1.034771,1.240354,.9207775,1.077017,1.041318,1.24255,.920261,1.075667,1.044774,1.248324,.9185974,1.075145,1.040977,1.234702,.9224205,1.077386,1.042985,1.223981,.9257527,1.075947,1.046914,1.236931,.9219432,1.075549,1.043552,1.249951,.918472,1.071596,1.047046,1.238777,.9225083,1.064516,1.054386,1.233412,.9237883,1.067635,1.052064,1.229679,.9239075,1.077445,1.045673,1.231093,.9243111,1.069283,1.051655,1.237164,.9236824,1.057635,1.060363,1.23414,.924156,1.06185,1.058003,1.229439,.9250195,1.067137,1.054015,1.219075,.9279693,1.068435,1.054693,1.219874,.9289406,1.056462,1.062664,1.351057,.9268237,.6911487,.758462,1.345649,.9285975,.689503,.7624663,1.340896,.9302508,.6871208,.7664383,1.335668,.9321398,.6838043,.7701726,1.331179,.9337941,.6806349,.7737919,1.326607,.9353993,.6781969,.7775793,1.321452,.9370214,.6773082,.7812998,1.317108,.9382621,.6778089,.7852731,1.313483,.9392762,.6784369,.7890634,1.308792,.9407749,.6774032,.7924957,1.303957,.9423903,.6756405,.7957984,1.299284,.943999,.6734639,.7991591,1.29447,.9456764,.6710253,.8025906,1.290198,.9471216,.6692865,.8061225,1.286778,.9480413,.6702479,.8096662,1.282814,.9492165,.6702782,.8131241,1.27772,.950833,.6692651,.8163398,1.273228,.9522646,.6683123,.8194978,1.269273,.9535789,.6669394,.8226404,1.265429,.9548669,.6654988,.8257774,1.261406,.9561326,.6648061,.8289628,1.257343,.9573539,.6646731,.8321061,1.254169,.9583287,.6643623,.8352185,1.250708,.9593647,.664292,.8380715,1.247071,.9604781,.6639709,.8407957,1.243803,.9614517,.6639515,.8434635,1.240211,.9627431,.6617359,.8460809,1.236806,.9638529,.6607671,.8486484,1.232466,.9651414,.6607849,.851134,1.228977,.9660765,.6617934,.8538706,1.225537,.96686,.6641643,.8566966,1.222965,.9676725,.6636874,.8595947,1.219297,.9689483,.6618521,.8624171,1.214773,.9703567,.6612222,.8650326,1.211024,.971502,.6609137,.8675845,1.207299,.9725269,.6617325,.8699949,1.205049,.9730737,.6629399,.8725118,1.202881,.9736323,.6637895,.8750214,1.199333,.9746286,.6643697,.8773136,1.195559,.9757962,.6639143,.8795482,1.191789,.9769628,.6634599,.8818446,1.188406,.9778537,.6645957,.8841692,1.185893,.9783132,.6674449,.8866186,1.183706,.9787095,.6699596,.8890246,1.179935,.9797681,.6705776,.8911461,1.176257,.9809359,.6698389,.8931287,1.173926,.9815805,.6703174,.8950529,1.170927,.9820957,.6740454,.8968245,1.16816,.9826343,.6768579,.8985868,1.166168,.9831228,.6778854,.9003976,1.164576,.9834888,.6789463,.9023412,1.161632,.984079,.6817676,.904201,1.158133,.9848655,.6842806,.90592,1.154775,.9856725,.6861754,.9076005,1.152106,.9861929,.6888804,.9094911,1.149548,.9867112,.6912773,.9113044,1.146742,.9873473,.6932401,.9129696,1.144019,.9879162,.6956223,.9144708,1.141487,.9882222,.7000459,.9159378,1.139834,.9884459,.7026978,.9174599,1.138067,.9887765,.7046266,.9190832,1.135365,.9893932,.7064729,.920475,1.132051,.9900467,.7097582,.9216228,1.129371,.990339,.7147555,.9228666,1.12735,.990557,.7185469,.9241331,1.12515,.9911216,.7194308,.9256017,1.122543,.9916494,.7218794,.9270293,1.1197,.9919787,.7269883,.9284214,1.117062,.992353,.7310501,.9297405,1.115045,.9925831,.7347075,.930774,1.11314,.9930278,.7359135,.9317461,1.111514,.9930491,.7404921,.9327632,1.109371,.9932101,.7452057,.9337909,1.106552,.9936844,.7488101,.9348487,1.103614,.9941194,.7531489,.9358661,1.101048,.9946126,.7558221,.9369118,1.098749,.9947908,.7608241,.9380774,1.096671,.9950412,.7644644,.9391316,1.094957,.9951258,.768672,.9401052,1.092847,.9953997,.7721718,.9412505,1.090889,.9954472,.7774692,.9424562,1.089207,.9955422,.7814809,.9433498,1.087399,.9957674,.7845716,.9440544,1.085589,.9958254,.7893286,.9449065,1.083517,.9959281,.7944109,.9458234,1.081855,.9959224,.7993609,.9468655,1.079789,.9962874,.801829,.947922,1.078713,.9960625,.8072264,.9487614,1.076983,.9961788,.8111671,.9496533,1.075025,.9961474,.8172444,.9505224,1.073482,.996356,.8197229,.951184,1.071477,.9963243,.8259402,.9519481,1.069552,.9966046,.8288309,.9528059,1.06741,.9967084,.8341104,.9540373,1.065191,.9970099,.8376585,.9550881,1.064542,.99663,.8433319,.9559646,1.063935,.9965208,.8462011,.9568398,1.063631,.9961644,.850626,.9574058,1.06244,.9959902,.8558601,.9580513,1.061864,.9957136,.8602955,.9587695,1.060915,.9956455,.863765,.9597132,1.059894,.9955761,.867458,.9606383,1.058809,.9952947,.8734415,.9617153,1.057307,.99549,.8759291,.962703,1.055906,.9955147,.8798097,.9635662,1.055269,.9952536,.8842728,.9637908,1.054325,.9951007,.8885669,.9642565,1.053674,.9949455,.8920207,.9650075,1.053348,.9945724,.8966748,.9657257,1.053235,.9941684,.9010125,.9666358,1.05311,.9939955,.9030928,.9673897,1.052899,.9937435,.9062089,.9680307,1.052364,.9933533,.9116514,.96871,1.051408,.9933562,.9144362,.9694942,1.050665,.9932842,.9173368,.9703227,1.04995,.9932013,.9202626,.9714049,1.050718,.9924992,.9249568,.971424,1.051501,.9919108,.9284805,.9711586,1.051554,.9915302,.9320933,.9716913,1.05133,.9912683,.9353497,.9724531,1.050901,.9910544,.93873,.9733805,1.051154,.9906599,.9418947,.9739328,1.051824,.99016,.9448715,.9743864,1.052818,.9894651,.9488282,.9747521,1.053342,.9890769,.9511315,.9754038,1.054814,.9882551,.9549381,.975556,1.055331,.9877802,.958121,.9762824,1.055959,.9873376,.9606544,.9769726,1.057311,.9865886,.964093,.9772864,1.058321,.9860145,.9668073,.9772831,1.059244,.9853901,.9702723,.9775702,1.059584,.9849825,.9733086,.9787407,1.062225,.9839314,.9759453,.9785373,1.064554,.9830314,.9780038,.978931,1.066567,.9820906,.9813951,.9794355,1.067781,.9815123,.9835462,.9801446,1.068521,.9810803,.9856485,.9804059,1.069194,.9805882,.9885419,.9809676,1.070898,.9797326,.9919981,.9807606,1.073192,.9788866,.9936258,.9809826,1.074704,.9781195,.9967697,.9808446,1.075911,.9774577,.9997712,.9810537,1.076109,.9772763,1.000986,.9817556,1.076561,.97689,1.003481,.9823986,1.079767,.9756093,1.006727,.9821391,1.081971,.9747768,1.008484,.9818349,1.083805,.9740277,1.010504,.9820659,1.08562,.9732131,1.01323,.9828782,1.086559,.9728675,1.013887,.9837018,1.08893,.9720584,1.014922,.9839955,1.091776,.9708423,1.018588,.9836024,1.094726,.9697948,1.020278,.9836079,1.096734,.969084,1.021406,.9836259,1.098633,.9683014,1.023565,.9843248,1.099941,.967672,1.025948,.9844378,1.102328,.9669356,1.026214,.984909,1.104486,.9661353,1.027788,.985293,1.106093,.9654387,1.029955,.9855915,1.107252,.9649741,1.031147,.9861356,1.109737,.9641439,1.032052,.9861982,1.112015,.9632527,1.034172,.9861889,1.114085,.9624528,1.036002,.9865338,1.116662,.9616506,1.036359,.9869469,1.118997,.9609188,1.036733,.9875852,1.120809,.9602054,1.038465,.9881106,1.122777,.9595675,1.038988,.9883335,1.125413,.9586646,1.04017,.9881022,1.12753,.9578221,1.042281,.9881086,1.129705,.9570903,1.043127,.9883052,1.13168,.9564783,1.043374,.9890011,1.133917,.9557153,1.044345,.9895327,1.136023,.9550885,1.044353,.9903126,1.138752,.9541357,1.045754,.9902079,1.141496,.953225,1.046694,.9903601,1.143679,.9524836,1.047612,.9905048,1.144798,.95209,1.048217,.9911489,1.1465,.9515381,1.048672,.9916176,1.148518,.9508617,1.049429,.9918304,1.150801,.9500886,1.050365,.9919412,1.152533,.9495087,1.051008,.9924177,1.15483,.9487823,1.051441,.9928651,1.157253,.9480232,1.051824,.9932652,1.160205,.9471056,1.052223,.9937659,1.162457,.9464451,1.052134,.9943428,1.164915,.9456838,1.052436,.9948904,1.168095,.9446634,1.05318,.9950869,1.171009,.9438252,1.052905,.995458,1.173713,.9429735,1.053378,.996001,1.175651,.9424257,1.053099,.9969185,1.17801,.9417779,1.05257,.9974377,1.18135,.9406146,1.054259,.9974886,1.184108,.9398357,1.053852,.9980307,1.1857,.9394454,1.053032,.9992696,1.188173,.938608,1.054045,1.000357,1.192019,.9375441,1.053257,1.00062,1.195701,.9364304,1.053449,1.00103,1.197806,.9357741,1.053752,1.002452,1.199601,.9353946,1.052225,1.003566,1.203207,.9342521,1.052925,1.003861,1.206496,.9332245,1.053417,1.004319,1.20869,.9326881,1.052271,1.005489,1.211967,.9317351,1.052062,1.006802,1.215962,.9305928,1.051615,1.007572,1.219623,.9295462,1.0512,1.00837,1.222877,.9285951,1.051039,1.009575,1.225022,.9280289,1.050333,1.010824,1.227225,.9273938,1.050138,1.011913,1.23025,.9264983,1.050099,1.012719,1.2338,.9254683,1.049851,1.013669,1.237886,.9243271,1.049124,1.015036,1.242185,.9232126,1.047506,1.016783,1.245959,.9221444,1.046974,1.018122,1.248955,.9212642,1.04687,1.019014,1.250579,.9208321,1.046368,1.020126,1.251974,.9204392,1.046153,1.021501,1.255557,.919427,1.045628,1.022834,1.261167,.9178965,1.04427,1.024024,1.264899,.9169389,1.042767,1.026229,1.267266,.9163213,1.041916,1.02808,1.270949,.9152476,1.041706,1.028475,1.274499,.9142164,1.041468,1.029631,1.274508,.9143861,1.039759,1.031859,1.278147,.9133999,1.038814,1.033473,1.283538,.911819,1.038598,1.034038,1.286978,.9109947,1.036634,1.03591,1.287555,.9109085,1.035789,1.038327,1.290811,.9100527,1.03468,1.039008,1.295139,.9088083,1.034262,1.039889,1.297425,.9083393,1.032177,1.042686,1.299252,.9080593,1.029571,1.044884,1.302819,.906947,1.030086,1.045401,1.305431,.9063277,1.028528,1.046436,1.307213,.905921,1.027311,1.049196,1.309413,.9054961,1.025042,1.050692,1.31266,.9047013,1.023353,1.051948,1.313352,.904513,1.023181,1.053743,1.313658,.9046638,1.020787,1.05554,1.315123,.9043515,1.019565,1.057499,1.319297,.903359,1.017106,1.059719,1.318766,.9036725,1.015565,1.061365,1.320423,.9031589,1.015775,1.062585,1.319892,.9037135,1.011842,1.065026,1.318176,.9042187,1.011891,1.066319,1.320219,.9037228,1.010788,1.06709,1.323115,.9032927,1.00652,1.070371,1.321314,.90384,1.006402,1.072279,1.322189,.9038864,1.003366,1.073713,1.319859,.9046364,1.002799,1.075321,1.317134,.9055288,1.001982,1.077566,1.318762,.9053921,.9985415,1.078944,1.320055,.9051496,.9971367,1.081714,1.317016,.9062928,.9947602,1.083701,1.316599,.9065685,.9932575,1.084915,1.313049,.9076275,.9932228,1.086757,1.310561,.9087324,.989603,1.089052,1.310707,.9088003,.9885017,1.091063,1.307718,.9099469,.9859423,1.093273]);var F4=`attribute float vmag,dcat,rad,temp,shown,avfg,dsun,dship,sclass;uniform float pix,avScale,band,gain;uniform sampler2D lut,sedLut;varying vec3 light;varying float soft;
vec4 thermal(float T){return texture2D(lut,vec2(clamp(log(max(100.,T)/100.)/log(10000.),0.,1.),.5));}
vec4 galaxySED(float cls,float D){float u=(.5+clamp((D-.72)/.37,0.,1.)*256.)/257.;return texture2D(sedLut,vec2(u,(cls+.5)/8.));}
${Fu}
${Ou}
void main(){float d=max(length(position),1e-6);vec3 n=position/d;float mag=vmag+5.*log(d/dcat)/log(10.)+avfg*(avScale-1.);float flux=pow(10.,-.4*(mag-3.))*${Nu};bool sedValid=(dsun>=.72&&dsun<=1.09&&dship>=.72&&dship<=1.09);
 vec4 seen=sedValid?galaxySED(sclass,dship):thermal(temp*dship),cat=sedValid?galaxySED(sclass,dsun):thermal(temp*dsun);
 flux*=sedValid?(seen.a/max(cat.a,1.e-12))*pow(dship/dsun,4.):exp(clamp(seen.a-cat.a,-60.,60.));
 flux*=shown;if(band>=3.)flux*=.005;
 vec4 mv=viewMatrix*vec4(n*1000.,1.);float size=clamp(2.*rad/d/pix*texelScale(mv.xyz),1.25,48.);soft=smoothstep(2.,5.,2.*rad/d/pix);flux*=mix(1.,gain,soft);psfS=psfSigma(size,soft,texelScale(mv.xyz));psfD=psfDraw(size,psfS);light=seen.rgb*flux*.818;
 if(band==0.){float y=dot(light,vec3(.2126,.7152,.0722));light=mix(vec3(y),light,smoothstep(.3,4.,flux));}
 light*=texelGain(mv.xyz);gl_Position=projectionMatrix*mv;gl_PointSize=psfD;if(shown<.001){gl_Position=vec4(2.,2.,2.,1.);gl_PointSize=0.;}}`;function Bu(i){let e=new E(...i.xyz).normalize(),t=new E(0,0,1);t.addScaledVector(e,-t.dot(e)).normalize();let n=new E().crossVectors(t,e).normalize(),s=i.pa*Math.PI/180,r=t.clone().multiplyScalar(Math.cos(s)).addScaledVector(n,Math.sin(s)),a=e.clone().applyAxisAngle(r,i.inc*Math.PI/180),o=new E().crossVectors(a,r).normalize();return new Ie().set(r.x,r.y,r.z,o.x,o.y,o.z,a.x,a.y,a.z)}var zu=8,ku=`uniform vec3 groupCenters[8];uniform mat3 groupRotations[8];uniform float groupShapes[8],groupSeeds[8];uniform vec4 groupParams[8];uniform float groupTime,groupGain;uniform vec3 groupTint[8];
float gh(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}
float gn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(gh(i),gh(i+vec3(1,0,0)),f.x),mix(gh(i+vec3(0,1,0)),gh(i+vec3(1,1,0)),f.x),f.y),mix(mix(gh(i+vec3(0,0,1)),gh(i+vec3(1,0,1)),f.x),mix(gh(i+vec3(0,1,1)),gh(i+vec3(1,1,1)),f.x),f.y),f.z);}
float gfbm(vec3 p){return .6*gn(p)+.3*gn(p*2.03)+.1*gn(p*4.1);}
vec3 groupRadiance(vec3 ray){vec3 total=vec3(0);for(int j=0;j<8;j++){float sh=groupShapes[j];if(sh<-.5)continue;vec4 P=groupParams[j];float sd=groupSeeds[j];
 vec3 eye=groupRotations[j]*(-groupCenters[j]),dir=groupRotations[j]*ray;float b=dot(eye,dir);vec3 perp=eye-dir*b;float disc=1.-dot(perp,perp);if(disc<0.)continue;
 float lo=max(0.,-b-sqrt(disc)),hi=-b+sqrt(disc);if(hi<=lo)continue;float ds=(hi-lo)/64.;vec3 light=vec3(0);float trans=1.;
 for(int i=0;i<64;i++){vec3 p=eye+dir*(lo+(float(i)+.5)*ds);float r=length(p.xy),theta=atan(p.y,p.x)-groupTime;float rough=sh<2.5?.55+.45*gfbm(p*9.+sd):1.;
  float disk=0.,bulge=0.,arms=0.;vec3 tint=vec3(1.,.72,.4);
  if(sh<.5){arms=P.y*pow(.5+.5*cos(2.*theta-8.*log(max(r,.025))),5.);disk=exp(-r*3.5)*exp(-abs(p.z)/P.z)*(1.-smoothstep(.78,1.,r));bulge=P.x*exp(-length(p/vec3(.17,.17,.11))*2.);}
  else if(sh<2.5){if(sh>1.5){vec3 q=p/vec3(.85,.4,.45);disk=exp(-dot(q,q)*2.2)*(1.-smoothstep(.85,1.,length(p)));}else{float bar=exp(-pow((p.x-.12)/.42,2.)-pow(p.y/.11,2.)-pow(p.z/.08,2.));disk=exp(-r*2.6)*exp(-abs(p.z)/.06)*(1.-smoothstep(.78,1.,r))+.9*bar;}arms=1.6*smoothstep(.45,.85,gfbm(p*6.+sd*.54));}
  else{vec3 q=p/vec3(1.,.82,P.z);float rho=length(q),edge=1.-smoothstep(.75,1.,length(p));
   if(sh<3.5){bulge=P.x*min(30.,.02*exp(-7.67*(pow(max(rho,.003)/.22,.25)-1.)))*edge;tint=vec3(1.,.78,.55);}
   else{bulge=P.x*exp(-rho*rho/.12)*edge;tint=vec3(.95,.82,.62);}}
  float dust=disk*(.4+arms)*rough;trans*=exp(-dust*ds*6.);
  light+=(disk*(.25+arms)*mix(vec3(.32,.49,.8),vec3(.8,.62,.4),rough*.5)+bulge*tint)*ds*trans*6.*P.w;if(trans<.01)break;}
 // The galaxy-integrated SED sets a common chromaticity at every apparent size.
  // Uncalibrated per-voxel colours would produce a false colour jump at the 3\u20138 px handoff.
  total+=dot(light,vec3(.2126,.7152,.0722))*groupTint[j];}return total;}`;var So=class{constructor(e){this.cache=new WeakMap,this.row=null,this.object=null,this.duplicate=null,this.references=xn.filter(n=>n.type==="galaxy").map(n=>({...n,xyz:n.p.map(s=>s*1e6),d:n.d*1e6}));let t=zu;this.uniforms={groupCenters:{value:Array.from({length:t},()=>new E)},groupRotations:{value:Array.from({length:t},()=>new Ie)},groupShapes:{value:Array(t).fill(-1)},groupSeeds:{value:Array(t).fill(0)},groupParams:{value:Array.from({length:t},()=>new st(1,1,.045,1))},groupTime:{value:0},inverseProjection:{value:new Ke},cameraWorld:{value:new Ke},exposure:{value:1}},this.material=new vt({uniforms:this.uniforms,vertexShader:"varying vec2 uvScreen;void main(){uvScreen=position.xy;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`precision highp float;varying vec2 uvScreen;uniform mat4 inverseProjection,cameraWorld;uniform float exposure;${ku}
void main(){vec3 rayCamera=(inverseProjection*vec4(uvScreen,1.,1.)).xyz;vec3 ray=normalize(mat3(cameraWorld)*rayCamera);vec3 light=groupRadiance(ray);gl_FragColor=vec4(1.-exp(-light*exposure),1.);}`,depthTest:!1,depthWrite:!1,transparent:!0,blending:gn}),this.mesh=new ft(new Si(2,2),this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.visible=!1,e.add(this.mesh)}model(e){return this.cache.has(e)||this.cache.set(e,Du(e)),this.cache.get(e)}radius(e){return this.model(e).radiusLy/1e6}select(e){if(e===this.row||(this.row=e,this.object=e?this.model(e):null,this.mesh.visible=!1,this.duplicate=null,this.uniforms.groupShapes.value.fill(-1),!e))return;let t=this.object,n=this.uniforms;n.groupShapes.value[0]=t.shapeCode,n.groupParams.value[0].set(...t.shapeParams),n.groupSeeds.value[0]=cr(t.id)%997,n.groupRotations.value[0].copy(Bu(t)),n.exposure.value=2/Math.max(.03,t.shapeParams[3]),this.duplicate=Iu(t,this.references)?.id||null}update(e){if(!this.row)return;let t=this.object.radiusLy/1e6,n=this.uniforms.groupCenters.value[0];n.set(...this.row.p).sub(e.position).divideScalar(t),this.mesh.visible=n.length()<250,e.updateMatrixWorld(),this.uniforms.inverseProjection.value.copy(e.projectionMatrixInverse),this.uniforms.cameraWorld.value.copy(e.matrixWorld)}};var To=class{constructor(e){this.rows=[],this.selected=null,this.root=new Tt,e.add(this.root),this.material=new vt({uniforms:{tint:{value:new Fe},size:{value:3},hiddenIndex:{value:-1}},transparent:!0,depthWrite:!1,blending:gn,vertexShader:"uniform float size,hiddenIndex;attribute float entryIndex;varying float hidden;void main(){hidden=abs(entryIndex-hiddenIndex)<.1?1.:0.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=size;}",fragmentShader:"uniform vec3 tint;varying float hidden;void main(){if(hidden>.5)discard;float r=length(gl_PointCoord-vec2(.5));float a=1.-smoothstep(.22,.5,r);if(a<.01)discard;gl_FragColor=vec4(tint,a*.5);}"}),this.points=new as(new ot,this.material),this.points.frustumCulled=!1,this.root.add(this.points),this.errorLine=new Gn(new ot,new En({color:16758904,transparent:!0,opacity:.75})),e.add(this.errorLine),this.errorLine.visible=!1,this.plane=new Tt,e.add(this.plane);let[t,n,s]=Yt.map(a=>new E(...a)),r=[];for(let a of[10,50,100,250,500])for(let o=0;o<128;o++)for(let c of[o,o+1])r.push(t.clone().multiplyScalar(a*Math.cos(c*Math.PI/64)).addScaledVector(n,a*Math.sin(c*Math.PI/64)));for(let a of[t,n])r.push(a.clone().multiplyScalar(-700),a.clone().multiplyScalar(700));this.plane.add(new bi(new ot().setFromPoints(r),new En({color:5941938,transparent:!0,opacity:.2,depthWrite:!1}))),this.plane.add(new Gn(new ot().setFromPoints([s.clone().multiplyScalar(-350),s.clone().multiplyScalar(350)]),new En({color:11048664,transparent:!0,opacity:.35})))}setRows(e,t){this.rows=e,this.points.geometry.dispose(),this.points.geometry=new ot,this.points.geometry.setAttribute("position",new it(e.flatMap(n=>n.p),3)),this.points.geometry.setAttribute("entryIndex",new it(e.map((n,s)=>s),1)),this.material.uniforms.tint.value.set(yn[t].color),this.selectedIndex=e.indexOf(this.selected),this.material.uniforms.hiddenIndex.value=-1}hideSelected(e){this.material.uniforms.hiddenIndex.value=e?this.selectedIndex:-1}select(e){if(this.selected=e,this.selectedIndex=this.rows.indexOf(e),this.material.uniforms.hiddenIndex.value=-1,this.errorLine.visible=!!e?.interval,!e?.interval)return;let t=new E(...e.p).normalize();this.errorLine.geometry.dispose(),this.errorLine.geometry=new ot().setFromPoints(e.interval.map(n=>t.clone().multiplyScalar(n*Pn)))}pick(e,t,n,s,r){let a=null,o=121,c=new E;e.updateMatrixWorld();for(let l of this.rows){if(c.set(...l.p).project(e),c.z<-1||c.z>1)continue;let h=((c.x+1)*s/2-t)**2+((1-c.y)*r/2-n)**2;h<o&&(o=h,a=l)}return a}};var hr={1:16761963,2:8370175,3:16744350,4:9429914,5:12884991,6:7332064,7:9080729,8:8357780,9:9143955},b2={u8:Uint8Array,u16:Uint16Array,u32:Uint32Array,i16:Int16Array,f32:Float32Array},Di=(i,e)=>new b2[e.type](i,e.offset,e.count);function lc(i,e){let t=Pn/e;return[0,1,2].map(n=>t*(i[0]*Yt[0][n]+i[1]*Yt[1][n]+i[2]*Yt[2][n]))}function Vu(i,e){let t=e/Pn;return Yt.map(n=>t*(n[0]*i[0]+n[1]*i[1]+n[2]*i[2]))}var cc=class{constructor(e,t){this.meta=e,this.buffer=t,this.h=e.h;let n=e.labelGrid,s=Di(t,n.labels),r=Di(t,n.runs),a=128**3;this.labels=new Uint8Array(a);let o=0;for(let c=0;c<s.length;c++)this.labels.fill(s[c],o,o+r[c]),o+=r[c];if(o!==a)throw Error("Grille des bassins incompl\xE8te");this.vel=Di(t,e.velocity.data),this.names=Object.fromEntries(e.basins.map(c=>[c.label,c.name]))}labelAt(e){let t=Vu(e,this.h),n=this.meta.labelCell,s=t.map(r=>Math.round(r/n+this.meta.labelCenterIndex));return s.some(r=>r<0||r>127)?0:this.labels[(s[2]*128+s[1])*128+s[0]]}basinAt(e){let t=this.labelAt(e);return t?{label:t,name:this.names[t]}:null}velocityAt(e){let t=Vu(e,this.h),n=this.meta.velocityCell,s=t.map(l=>l/n+this.meta.velocityCenterIndex);if(s.some(l=>l<0||l>63))return null;let r=s.map(l=>Math.min(62,Math.floor(l))),a=s.map((l,h)=>l-r[h]),o=[0,0,0],c=64**3;for(let l=0;l<2;l++)for(let h=0;h<2;h++)for(let d=0;d<2;d++){let f=(l?a[0]:1-a[0])*(h?a[1]:1-a[1])*(d?a[2]:1-a[2]),p=((r[0]+l)*64+(r[1]+h))*64+(r[2]+d);for(let g=0;g<3;g++)o[g]+=f*this.vel[g*c+p]}return o}velocityEqAt(e){let t=this.velocityAt(e);return t&&[0,1,2].map(n=>t[0]*Yt[0][n]+t[1]*Yt[1][n]+t[2]*Yt[2][n])}},wo=null;function S2(i="./",e=fetch){return wo||(wo=Promise.all([e(i+"cf4-basins-2023.json").then(t=>{if(!t.ok)throw Error("cf4-basins-2023.json indisponible");return t.json()}),e(i+"cf4-basins-2023.bin").then(t=>{if(!t.ok)throw Error("cf4-basins-2023.bin indisponible");return t.arrayBuffer()})]).then(([t,n])=>{if(t.schema!==1||n.byteLength!==t.binaryBytes)throw Error("Donn\xE9es des bassins incoh\xE9rentes");return new cc(t,n)}).catch(t=>{throw wo=null,t})),wo}var T2="varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}",w2="uniform vec3 color;uniform float strength;varying vec3 vN;varying vec3 vV;void main(){float rim=1.-abs(dot(normalize(vN),normalize(vV)));float a=strength*(.015+.32*pow(rim,3.));gl_FragColor=vec4(color*a,a);}",E2="attribute float phase;attribute vec3 color;varying float vPhase;varying vec3 vColor;void main(){vPhase=phase;vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",A2="uniform float time,opacity;varying float vPhase;varying vec3 vColor;void main(){float wave=fract(vPhase/60.-time*.25);float a=opacity*(.25+.75*smoothstep(.0,.85,wave)*(1.-smoothstep(.85,1.,wave)));gl_FragColor=vec4(vColor*a,a);}",Eo=class{constructor(e){this.root=new Tt,this.root.visible=!1,e.add(this.root),this.shells=new Tt,this.lines=null,this.root.add(this.shells),this.status="idle",this.data=null,this.entries=[]}async load(e){return this.status==="ready"||this.status==="loading"?this.ready:(this.status="loading",this.ready=S2(e).then(t=>(this.build(t),this.status="ready",t)).catch(t=>{throw this.status="error",this.error=t.message,t}),this.ready)}build(e){this.data=e;let{meta:t,buffer:n}=e,s=t.h,r=t.labelCell,a=t.labelCenterIndex;for(let x of t.basins){let m=Di(n,x.vertices),u=Di(n,x.faces),w=new Float32Array(m.length);for(let P=0;P<m.length;P+=3){let N=lc([(m[P]/16-a)*r,(m[P+1]/16-a)*r,(m[P+2]/16-a)*r],s);w[P]=N[0],w[P+1]=N[1],w[P+2]=N[2]}let S=new ot;S.setAttribute("position",new It(w,3)),S.setIndex(new It(u instanceof Uint16Array?new Uint16Array(u):new Uint32Array(u),1)),S.computeVertexNormals();let v=x.label===1?1:x.label<=6?.38:.18,R=new vt({vertexShader:T2,fragmentShader:w2,uniforms:{color:{value:new Fe(hr[x.label])},strength:{value:v}},transparent:!0,depthWrite:!1,side:cn,blending:Ma,blendSrc:ba,blendDst:Ji}),C=new ft(S,R);C.renderOrder=3,this.shells.add(C),this.entries.push({basin:x,mesh:C,attractor:lc(x.attractorMpch,s)})}let o=t.streamlines,c=Di(n,o.meta),l=Di(n,o.points),h=[],d=[],f=[],p=0;for(let x=0;x<o.count;x++){let m=c[2*x],u=c[2*x+1],w=new Fe(hr[u]||10134445),S=null,v=0;for(let R=0;R<m;R++,p++){let C=lc([l[3*p]/10,l[3*p+1]/10,l[3*p+2]/10],s);if(S){h.push(...S,...C);let P=Math.hypot(C[0]-S[0],C[1]-S[1],C[2]-S[2]);d.push(w.r,w.g,w.b,w.r,w.g,w.b),f.push(v,v+P),v+=P}S=C}}let g=new ot;g.setAttribute("position",new it(h,3)),g.setAttribute("color",new it(d,3)),g.setAttribute("phase",new it(f,1)),this.lines=new bi(g,new vt({vertexShader:E2,fragmentShader:A2,uniforms:{time:{value:0},opacity:{value:.4}},transparent:!0,depthWrite:!1,blending:gn})),this.lines.renderOrder=4,this.root.add(this.lines)}update(e,{shells:t=!0,lines:n=!0,sdss:s=!1}={}){if(this.status==="ready"){this.shells.visible=t;for(let r of this.entries)r.mesh.visible=t&&(s||r.basin.label<=6);this.lines.visible=n,this.lines.material.uniforms.time.value=e}}};var C2="vec3 aberr(vec3 n,vec3 m){float u=length(m),g=sqrt(1.+u*u);if(u<1.e-8)return n;vec3 e=m/u;float mu=clamp(dot(n,e),-1.,1.);vec3 perp=n-e*mu;float plus=mu<0.?dot(perp,perp)/(1.-mu):1.+mu;float inv=1./(g+u),D=g*plus-mu*inv;return normalize((perp+e*(g*plus-inv))/max(1.e-30,D));}",d_=`uniform vec3 ship,momentum;${C2}vec4 place(vec3 p){vec3 r=p-ship;float d=max(length(r),1.e-6);vec3 n=aberr(r/d,momentum);return projectionMatrix*viewMatrix*vec4(n*min(d,2000.),1.);}`;var R2={galaxy:15848098,group:9558984,"galaxy-cluster":16762749,supercluster:8698345,basin:7526342,attractor:16754028,void:11049196},P2="varying vec3 p;varying vec3 col;varying vec3 n;uniform float boost,optics,minPixel,screenHeight;uniform vec3 momentum;varying float doppler;void main(){p=position;col=instanceColor;n=normal;vec4 center=modelViewMatrix*instanceMatrix*vec4(0.,0.,0.,1.);float size=length((modelMatrix*vec4(instanceMatrix[0].xyz,0.)).xyz);float floorSize=abs(center.z)*.89/max(screenHeight,1.)*minPixel;float scale=max(boost,floorSize/max(size,1.e-12));vec4 q=instanceMatrix*vec4(position*scale,1.);vec4 world=modelMatrix*q;float d=max(length(world.xyz),1.e-10),u=length(momentum),g=sqrt(1.+u*u);doppler=1.;if(optics>.5&&u>1.e-6){vec3 n=world.xyz/d,e=momentum/u;float mu=dot(n,e);doppler=max(1.e-8,g+u*mu);world.xyz=(n+e*((g-1.)*mu+u))/doppler*d;}gl_Position=projectionMatrix*viewMatrix*world;}",I2="precision highp float;varying vec3 p,col,n;varying float doppler;void main(){float r=length(p.xy);float elliptical=step(1.1,col.r);float spiral=(1.-elliptical)*pow(.5+.5*cos(2.*atan(p.y,p.x)-7.*log(max(r,.035))),3.);float core=exp(-r*12.);float grain=.65+.35*sin(p.x*9.+sin(p.y*5.))*sin(p.y*7.);float glow=exp(-r*2.5)*(.46+.32*spiral+.22*grain)+core*.9;float edge=1.-smoothstep(.72,1.,r);gl_FragColor=vec4(mix(min(col,vec3(1.)),vec3(1.,.93,.8),core)*glow*clamp(pow(doppler,.6),.03,8.),edge*.86);}",L2=i=>[...i].reduce((e,t)=>Math.imul(e,31)+t.charCodeAt(0)>>>0,7219),Ao=class{constructor({map:e=!0}={}){this.root=new Tt,this.map=e,this.entries=[],this.targets=[],this.envelopes=new Tt,this.filaments=new Tt,this.galaxies=new Tt,this.root.add(this.filaments,this.galaxies,this.envelopes),this.byId=new Map(xn.map(s=>[s.id,s]));let t=new Hn(1,32,20);this.material=new vt({uniforms:{boost:{value:e?6:1},minPixel:{value:e?1.8:0},screenHeight:{value:1e3},optics:{value:0},momentum:{value:new E}},vertexShader:P2,fragmentShader:I2,transparent:!0,depthWrite:!1,blending:gn});for(let s of xn){let r=L2(s.id),a=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296),o=()=>Math.sqrt(-2*Math.log(Math.max(a(),1e-8)))*Math.cos(2*Math.PI*a()),c=s.type==="galaxy"?1:s.type==="void"?12:s.type==="galaxy-cluster"?220:s.type==="group"?70:360,l=new qs(s.type==="galaxy"?new Hn(1,64,40):t,this.material,c);l.frustumCulled=!1;let h=new Ot;for(let p=0;p<c;p++){let g;if(s.type==="galaxy")g=[0,0,0];else if(s.type==="galaxy-cluster"||s.type==="group")g=[o(),o(),o()].map(u=>u*s.r*.28);else if(s.type==="void")g=[o(),o(),o()].map(u=>u*s.r*.25);else{let u=a(),w=p%3*2.094+u*.8,S=s.r*u;g=[S*Math.cos(w)+o()*s.r*.045,S*Math.sin(w)*.7+o()*s.r*.045,(o()*.04+.12*Math.sin(u*5+p%3))*s.r]}let x=this.byId.get("bootes-void"),m=g.map((u,w)=>u+s.p[w]);if(s.type!=="void"&&s.type!=="galaxy"&&Math.hypot(...m.map((u,w)=>u-x.p[w]))<x.r*.92)h.scale.setScalar(0);else{let u=s.type==="galaxy"?s.r:s.type==="group"?.002+.015*a():.015+.045*a();h.scale.set(u,u*(.65+.35*a()),u*(s.id==="m87"?.65:.09+.1*a()))}h.position.set(...m),h.rotation.set(a()*Math.PI,a()*Math.PI,a()*Math.PI),s.type==="galaxy"&&h.rotation.set(.45,0,s.id==="m31"?.5:-.4),h.updateMatrix(),l.setMatrixAt(p,h.matrix),l.setColorAt(p,s.id==="m87"?new Fe(1.2,.87,.66):new Fe().setHSL(.09+a()*.08,.3,.7+a()*.2))}l.instanceMatrix.needsUpdate=!0,this.galaxies.add(l);let d=new Tt;for(let p=0;p<3;p++){let g=[];for(let x=0;x<=160;x++){let m=x*Math.PI/80,u=[Math.cos(m)*s.r,Math.sin(m)*s.r,0];p===1&&([u[1],u[2]]=[u[2],u[1]]),p===2&&([u[0],u[2]]=[u[2],u[0]]),g.push(new E(...u))}d.add(new Gn(new ot().setFromPoints(g),new En({color:R2[s.type],transparent:!0,opacity:.25})))}d.position.set(...s.p),this.envelopes.add(d);let f=new ft(new Hn(s.r,24,16),new wn({visible:!1}));f.position.set(...s.p),f.userData.data=s,this.root.add(f),this.targets.push(f),this.entries.push({o:s,mesh:l,outline:d,pick:f})}let n=[["local-group","virgo-cluster"],["virgo-cluster","centaurus"],["centaurus","norma"],["norma","shapley"],["coma","hercules-cluster"],["perseus","perseus-pisces"]];for(let[s,r]of n){let a=new E(...this.byId.get(s).p),o=new E(...this.byId.get(r).p),c=a.clone().lerp(o,.5).add(new E(0,a.distanceTo(o)*.09,0)),l=new os([a,c,o]),h=new ft(new js(l,64,Math.max(.08,a.distanceTo(o)*.003),8,!1),new wn({color:7517400,transparent:!0,opacity:.38,depthWrite:!1}));this.filaments.add(h)}this.sun=new ft(new Hn(.08,32,20),new wn({color:9759696})),this.root.add(this.sun)}update(e,t,n,{envelopes:s=!0,filaments:r=!0,boost:a=6,synthetic:o=!0}={}){let c=this.byId.get(t),l=this.map&&c?.type==="galaxy"?Math.min(a,Math.max(1,n/(c.r*12))):a;this.material.uniforms.boost.value=l,this.material.uniforms.minPixel.value=a>1?1.8:0,this.envelopes.visible=s,this.filaments.visible=r&&e>0,this.sun.scale.setScalar(Math.max(.5,n*.003));for(let h of this.entries){let d=h.o.level<=e||h.o.id===t,f=n<h.o.r*.4,p=["basin","supercluster","attractor"].includes(h.o.type);h.mesh.visible=(o||this.map&&h.o.type==="galaxy")&&d&&(!p||n>h.o.r*.25),h.outline.visible=d&&!f&&h.o.type!=="galaxy"&&(h.o.id===t||h.o.type==="void"||h.o.type==="basin");for(let g of h.outline.children)g.material.opacity=h.o.id===t?.55:.18;h.pick.visible=d}}};var k=i=>document.getElementById(i),et=(i,e=1)=>new Intl.NumberFormat("fr-FR",{maximumFractionDigits:e}).format(i),St=new Map(xn.map(i=>[i.id,i]));window.addEventListener("error",i=>{k("loading").hidden=!0,k("error").hidden=!1,k("error").textContent="Le rendu 3D a rencontr\xE9 une erreur. Recharge la page ou v\xE9rifie que WebGL est disponible."});var xt=k("cosmos"),Ss=new yo({canvas:xt,antialias:!0,powerPreference:"high-performance"});Ss.setPixelRatio(Math.min(devicePixelRatio,2));Ss.setClearColor(198671);Ss.outputColorSpace=Nt;var fr=new rs,Xe=new Ft(48,1,1e-5,1e4);Xe.up.set(0,0,1);var gt=new bo(Xe,xt);gt.enableDamping=!0;gt.minDistance=.005;gt.maxDistance=5e3;var In=new Ao;fr.add(In.root);var Zn=new To(fr),mt=new So(fr),Pt=new Eo(fr),uc=new Map,bt=0,$e="local-group",ur=8,Mt=null,zt=!1,Gu=0,Zt=new Set,ui=null,pc=!1,dr=[],Yn=[],Co="",hc=0,Ui=!1,Hu=new Map,dc=new Map,qu=new Map;for(let i of xn){let e=document.createElement("button");e.className="label",e.textContent=i.name,e.onclick=()=>tn(i.id);let t=document.createElement("i");t.className="label-leader",k("labels").append(t,e),dc.set(i.id,e),qu.set(i.id,t)}k("levels").innerHTML=hi.map((i,e)=>`<button data-level="${e}">${e+1} \xB7 ${i.name}</button>`).join("");k("levels").onclick=i=>{let e=i.target.closest("[data-level]");e&&pr(+e.dataset.level)};k("address").innerHTML=["milky-way","local-group","virgo-supercluster","laniakea"].map(i=>`<button data-object="${i}">${St.get(i).name}</button>`).join("");k("address").onclick=i=>{let e=i.target.closest("[data-object]");e&&tn(e.dataset.object)};function Ro(){let i=k("search").value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),e=[...St.values()].filter(t=>t.type!=="observed").filter(t=>!i||[t.name,t.id,sc[t.type]].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(i));k("results").innerHTML=e.map(t=>`<button data-object="${t.id}" class="${$e===t.id?"active":""}">${t.name}</button>`).join("")||"<small>Aucune structure trouv\xE9e.</small>"}k("search").oninput=Ro;k("results").onclick=i=>{let e=i.target.closest("[data-object]");e&&tn(e.dataset.object)};function D2(){let i=St.get($e);if(i.type==="observed"){B2(i),Ro();return}k("flight").hidden=!1,k("flight").textContent="Choisir cette destination dans le cockpit",Zn.select(null),mt.select(null),k("kind").textContent=sc[i.type],k("name").textContent=i.name,k("summary").textContent=i.summary,k("relation").textContent=i.relation,k("distance").textContent=i.id==="local-group"?"Nous sommes dans ce groupe":i.type==="basin"||i.type==="supercluster"||i.type==="attractor"?"Rep\xE8re de cadrage : \u2248 "+et(i.d)+" millions d\u2019al":"Centre : \u2248 "+et(i.d,i.d<1?3:1)+" millions d\u2019al",k("coordinates").textContent=`Direction \xE9quatoriale J2000 : \u03B1 ${et(i.ra,2)}\xB0, \u03B4 ${et(i.dec,2)}\xB0. X ${et(i.p[0])}, Y ${et(i.p[1])}, Z ${et(i.p[2])} millions d\u2019al depuis le Soleil. Coordonn\xE9es arrondies / point de cadrage pour les r\xE9gions \xE9tendues.`,k("extent").textContent=i.extent,k("sources").innerHTML=i.links.map(([e,t])=>`<a href="${t}" target="_blank" rel="noopener">${e}</a>`).join(""),k("relations").innerHTML=[["Inclus dans",i.inside],["\xC0 explorer dans cet ensemble",i.contains]].map(([e,t])=>t.length?`<div class="related"><small>${e}</small>${t.map(n=>`<button data-object="${n}">${St.get(n).name}</button>`).join("")}</div>`:"").join(""),k("enter").textContent=i.type==="void"?"Entrer dans le vide":"Explorer l\u2019int\xE9rieur",k("flight").href="./cockpit.html?target="+encodeURIComponent(["m31","m33"].includes(i.id)?i.id:i.id==="milky-way"?"sgr-a":"cosmic:"+i.id),i.reconstruction&&(k("flight").hidden=!0,k("flight").removeAttribute("href"),k("kind").textContent="Bassin reconstruit \xB7 CF4 2023",k("coordinates").textContent="Attracteur publi\xE9 \xB7 X / Y / Z : "+i.p.map(e=>et(e,2)).join(" / ")+" millions d\u2019al depuis la Voie lact\xE9e."),i.type==="galaxy"&&(k("enter").textContent="Observer de pr\xE8s"),Ro()}k("relations").onclick=i=>{let e=i.target.closest("[data-object]");e&&tn(e.dataset.object)};function Yu(){zt=!1,Zt.clear(),gt.enabled=!0,document.body.classList.remove("immersion"),k("touch-controls").hidden=!0}function Po(i,e,t=!1){Yu();let n=new E(...i),s=new E(1,-1.45,.9).normalize().multiplyScalar(e*1.35);ur=e,Mt={from:Xe.position.clone(),fromTarget:gt.target.clone(),to:n.clone().add(s),target:n,time:performance.now(),duration:t?0:1100}}function pr(i,e=!1){gt.minDistance=.005,bt=Math.max(0,Math.min(hi.length-1,i));let t=hi[bt];$e=t.focus;let n=bt===3?[0,0,0]:St.get(t.focus).p;Po(n,t.span,e),Lo(),No()}function Io(i){return i.type==="observed"?mt.radius(i):i.r}function Zu(i){return["galaxy","observed"].includes(i.type)?Math.max(1e-4,Io(i)*1.5):.005}function U2(i){return i.type==="observed"?Math.max(.001,Io(i)*4):i.type==="galaxy"?Math.max(i.r*4,.02):Math.max(i.r*3.1,.2)}function tn(i){let e=St.get(i);if(!e)return;if($e===i&&!zt&&gt.target.distanceTo(new E(...e.p))<1e-7&&!Mt){let n=Xe.position.clone().sub(gt.target),s=n.length(),r=Zu(e),a=Math.max(r,s*.55);ur=a/1.35,Mt={from:Xe.position.clone(),fromTarget:gt.target.clone(),to:gt.target.clone().add(n.setLength(a)),target:gt.target.clone(),time:performance.now(),duration:650}}else($e!==i||!Mt)&&mc(i,!0)}gt.addEventListener("start",()=>{Mt&&(Xe.position.copy(Mt.to),gt.target.copy(Mt.target),Mt=null)});xt.parentElement.addEventListener("wheel",i=>{i.target===xt||!i.target.closest(".label")||(i.preventDefault(),xt.dispatchEvent(new WheelEvent("wheel",{deltaX:i.deltaX,deltaY:i.deltaY,deltaMode:i.deltaMode,clientX:i.clientX,clientY:i.clientY,ctrlKey:i.ctrlKey,metaKey:i.metaKey,bubbles:!1,cancelable:!0})))},{passive:!1});k("survey-marker").onclick=()=>tn($e);k("approach").onclick=()=>tn($e);function mc(i,e=!1){if(!St.has(i))return;let t=bt,n=St.get(i);$e=i,n.reconstruction&&(k("basins-show").checked=!0,n.level===3&&(k("basins-sdss").checked=!0,gc())),gt.minDistance=Zu(n),n.type!=="observed"&&(bt=n.level,k("survey-search").value="",k("survey-radius").value="Infinity",k("survey-error").value="Infinity"),e&&Po(n.p,U2(n)),Lo(),bt!==t?No():n.type!=="observed"&&Uo()}function Lo(){let i=hi[bt];k("level-title").textContent=i.name,k("level-caption").textContent=i.text,k("previous").disabled=bt===0,k("next").disabled=bt===hi.length-1,document.querySelectorAll("[data-level]").forEach(e=>e.classList.toggle("active",+e.dataset.level===bt)),D2(),k("quick-flight").hidden=k("flight").hidden,k("flight").hidden?k("quick-flight").removeAttribute("href"):k("quick-flight").href=k("flight").getAttribute("href"),k("quick-flight").textContent="Ouvrir "+St.get($e).name+" dans le cockpit"}k("previous").onclick=()=>pr(bt-1);k("next").onclick=()=>pr(bt+1);k("home").onclick=()=>pr(0);k("focus").onclick=()=>mc($e,!0);k("outside").onclick=()=>{let i=St.get($e);Po(i.p,i.type==="observed"?Math.max(Io(i)*25,.08):Math.max(i.r*3.1,.2))};k("enter").onclick=()=>{let i=St.get($e);if(["observed","galaxy"].includes(i.type)){Po(i.p,Io(i)*2);return}Mt=null,gt.enabled=!1,zt=!0,Zt.clear(),document.body.classList.add("immersion"),k("touch-controls").hidden=!1,ur=Math.max(i.r*.8,.1);let e=new E(...i.p);Xe.position.copy(e).add(new E(.2,-.3,.13).multiplyScalar(i.r)),Xe.lookAt(e),xt.focus()};k("clean").onclick=()=>{document.body.classList.add("clean"),k("restore").hidden=!1,Do()};k("restore").onclick=()=>{document.body.classList.remove("clean"),k("restore").hidden=!0,Do()};function Do(){let i=xt.parentElement.getBoundingClientRect();Ss.setSize(i.width,i.height,!1),Xe.aspect=i.width/i.height,Xe.updateProjectionMatrix()}new ResizeObserver(Do).observe(xt.parentElement);Do();xt.addEventListener("pointerdown",i=>{ui=[i.clientX,i.clientY],pc=!1,zt&&xt.setPointerCapture(i.pointerId)});xt.addEventListener("pointermove",i=>{if(!ui)return;let e=i.clientX-ui[0],t=i.clientY-ui[1];Math.hypot(e,t)>3&&(pc=!0),zt&&(Xe.rotateOnWorldAxis(new E(0,0,1),-e*.003),Xe.rotateX(-t*.003),ui=[i.clientX,i.clientY])});xt.addEventListener("pointerup",i=>{if(ui&&!pc&&!zt){let e=xt.getBoundingClientRect(),t=new er;t.setFromCamera(new fe((i.clientX-e.left)/e.width*2-1,-(i.clientY-e.top)/e.height*2+1),Xe);let n=t.intersectObjects(In.entries.filter(r=>r.pick.visible&&(r.mesh.visible||r.outline.visible&&In.envelopes.visible)).map(r=>r.pick)).sort((r,a)=>r.object.userData.data.r-a.object.userData.data.r),s=Ui?Zn.pick(Xe,i.clientX-e.left,i.clientY-e.top,e.width,e.height):null;if(s)St.set(s.id,s),tn(s.id);else if(mt.mesh.visible&&t.ray.intersectsSphere(new on(new E(...mt.row.p),mt.radius(mt.row))))tn(mt.row.id);else if(n.length)tn(n[0].object.userData.data.id);else if(Pt.root.visible&&Pt.shells.visible){let r=t.intersectObjects(Pt.entries.filter(a=>a.mesh.visible).map(a=>a.mesh))[0];r&&tn(r.object.userData.mapId)}}ui=null});xt.addEventListener("pointercancel",()=>ui=null);window.addEventListener("keydown",i=>{!zt||/INPUT|SELECT|TEXTAREA/.test(i.target.tagName)||(Zt.add(i.key.toLowerCase()),["w","z","s","a","q","d","arrowup","arrowdown","arrowleft","arrowright"].includes(i.key.toLowerCase())&&i.preventDefault())});window.addEventListener("keyup",i=>Zt.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>Zt.clear());var Wu={forward:"w",back:"s",left:"a",right:"d"};document.querySelectorAll("[data-move]").forEach(i=>{i.onpointerdown=e=>{e.preventDefault(),Zt.add(Wu[i.dataset.move]),i.setPointerCapture(e.pointerId)},i.onpointerup=i.onpointercancel=()=>Zt.delete(Wu[i.dataset.move])});function N2(){let i=xt.getBoundingClientRect(),e=[],t=xn.filter(s=>s.id!==$e).sort((s,r)=>(r.type==="attractor"?5:r.level)-(s.type==="attractor"?5:s.level)),n=dc.has($e)?[St.get($e),...t]:t;for(let s of n){let r=dc.get(s.id),a=qu.get(s.id),o=In.entries.find(m=>m.o===s);if(r.hidden=a.hidden=!0,zt&&s.id!==$e||!o.pick.visible||bt>0&&s.type==="galaxy"&&s.id!==$e)continue;let c=new E(...s.p).project(Xe);if(c.z<-1||c.z>1||Math.abs(c.x)>1||Math.abs(c.y)>1)continue;let l=(c.x+1)*i.width/2,h=(1-c.y)*i.height/2,d=Math.min(i.width<500?165:220,s.name.length*7+18),f=26,p;for(let m of[0,32,-32,64,-64,96,-96]){for(let u of[10,-d-10]){let w=l+u,S=h+m;if(!(w<5||w+d>i.width-5||S<225||S>i.height-160)&&!e.some(v=>w<v.x+v.w&&w+d>v.x&&S<v.y+v.h+5&&S+f+5>v.y)){p={x:w,y:S,w:d,h:f};break}}if(p)break}if(!p)continue;r.hidden=!1,r.style.left=p.x+"px",r.style.top=p.y+"px",r.classList.toggle("selected",s.id===$e),e.push(p);let g=p.x>l?p.x:p.x+d,x=p.y+f/2;a.hidden=!1,a.style.left=l+"px",a.style.top=h+"px",a.style.width=Math.hypot(g-l,x-h)+"px",a.style.transform="rotate("+Math.atan2(x-h,g-l)+"rad)"}}function F2(){for(let i of Pt.entries){let e=i.basin,t=i.attractor,n=Math.hypot(...t);i.mesh.geometry.computeBoundingSphere();let s=i.mesh.geometry.boundingSphere,r=s.radius+s.center.distanceTo(new E(...t)),a="cf4-basin:"+e.label;i.mesh.userData.mapId=a,St.set(a,{id:a,name:"Bassin de "+e.name+" \xB7 CF4 2023",type:"basin",reconstruction:!0,p:t,d:n,r,level:e.label<=6?2:3,ra:(Math.atan2(t[1],t[0])*180/Math.PI+360)%360,dec:Math.asin(t[2]/n)*180/Math.PI,inside:[],contains:[],summary:"Bassin d\u2019attraction de la reconstruction Cosmicflows-4 2023 non group\xE9e. Son volume et ses courants sont d\xE9duits des distances des galaxies ; les vitesses 3D ne sont pas mesur\xE9es directement.",relation:"Le cadrage est centr\xE9 sur l\u2019attracteur publi\xE9. Les lignes montrent le champ de vitesse actuel, pas le voyage futur des galaxies."+(e.truncatedByBox?" Ce bassin est coup\xE9 par le bord du mod\xE8le.":""),extent:"Volume publi\xE9 : "+et(e.volume1e6Mpch3)+" \xD7 10\u2076 (Mpc/h)\xB3, h = "+Pt.data.h+". Fronti\xE8re d\xE9pendante de la reconstruction ; aucune paroi mat\xE9rielle.",links:[["Dupuy & Courtois 2023 \xB7 bassins","https://doi.org/10.1051/0004-6361/202346802"],["Courtois et al. 2023 \xB7 champ de vitesse","https://arxiv.org/abs/2211.16390"]]})}Ro()}k("basins-legend").onclick=i=>{let e=i.target.closest("[data-basin]");e&&tn(e.dataset.basin)};function gc(){Pt.data&&(k("basins-legend").innerHTML=Pt.data.meta.basins.filter(i=>i.label<=6||k("basins-sdss").checked).map(i=>'<button data-basin="cf4-basin:'+i.label+'"><i style="background:#'+hr[i.label].toString(16).padStart(6,"0")+'"></i>'+$u(i.name)+" \xB7 "+et(i.volume1e6Mpch3,1)+" \xD7 10\u2076 (Mpc/h)\xB3"+(i.truncatedByBox?" (coup\xE9)":"")+"</button>").join(""))}k("basins-sdss").addEventListener("change",gc);function O2(i){let e=bt>=2&&(k("basins-show").checked||k("basins-lines").checked);e&&Pt.status==="idle"&&(k("basins-status").textContent="Chargement de la reconstruction\u2026",Pt.load("./").then(n=>{k("basins-status").textContent="Reconstruction CF4 2023 charg\xE9e \xB7 accord des lignes de courant avec les bassins publi\xE9s : "+Object.entries(n.meta.validation.streamlineAgreement).map(([s,r])=>s+" "+Math.round(r*100)+" %").join(", ")+".",F2(),gc();for(let s of Pt.entries){let r=document.createElement("button");r.className="label basin-label",r.onclick=()=>tn(s.mesh.userData.mapId),r.textContent=(s.basin.label===1?"\u25C9 ":"")+"Attracteur \xB7 "+s.basin.name,r.hidden=!0,k("labels").append(r),uc.set(s,r)}}).catch(n=>{k("basins-status").textContent="Reconstruction indisponible : "+n.message})),Pt.root.visible=e&&Pt.status==="ready",Pt.update(i/1e3,{shells:k("basins-show").checked,lines:k("basins-lines").checked,sdss:k("basins-sdss").checked});let t=xt.getBoundingClientRect();for(let[n,s]of uc){let r=$e===n.mesh.userData.mapId;if(s.classList.toggle("selected",r),n.mesh.material.uniforms.strength.value=r?1.3:n.basin.label===1?1:n.basin.label<=6?.38:.18,s.hidden=!0,!Pt.root.visible||!k("basins-show").checked||n.basin.label>6&&!k("basins-sdss").checked||zt)continue;let a=new E(...n.attractor).project(Xe);a.z<-1||a.z>1||Math.abs(a.x)>.95||Math.abs(a.y)>.95||(s.hidden=!1,s.style.left=(a.x+1)*t.width/2+8+"px",s.style.top=(1-a.y)*t.height/2-12+"px",s.style.color="#"+hr[n.basin.label].toString(16).padStart(6,"0"))}}function Ku(i){requestAnimationFrame(Ku);let e=Math.min(.1,(i-Gu)/1e3||0);if(Gu=i,Mt){let s=Mt.duration?Math.min(1,(i-Mt.time)/Mt.duration):1;s=s*s*(3-2*s),Xe.position.lerpVectors(Mt.from,Mt.to,s),gt.target.lerpVectors(Mt.fromTarget,Mt.target,s),s>=1&&(Mt=null)}if(zt){let s=ur*.25*e,r=+[...Zt].some(o=>["w","z","arrowup"].includes(o))-+[...Zt].some(o=>["s","arrowdown"].includes(o)),a=+(Zt.has("d")||Zt.has("arrowright"))-+(Zt.has("a")||Zt.has("q")||Zt.has("arrowleft"));Xe.translateZ(-r*s),Xe.translateX(a*s)}else gt.update();let t=zt?ur:Xe.position.distanceTo(gt.target),n=2*t*Math.tan(Xe.fov*Math.PI/360)*Xe.aspect;if(In.update(bt,$e,n,{envelopes:k("envelopes").checked&&!zt,filaments:k("filaments").checked&&!zt,boost:Number(k("boost").value),synthetic:k("synthetic").checked}),In.material.uniforms.screenHeight.value=xt.clientHeight,mt.update(Xe),Zn.hideSelected(mt.mesh.visible),mt.mesh.visible&&mt.duplicate){let s=In.entries.find(r=>r.o.id===mt.duplicate);s&&(s.mesh.visible=!1)}Zn.plane.visible=k("survey-plane").checked,O2(i),Zn.material.uniforms.size.value=Math.min(devicePixelRatio,2)*4,Ss.render(fr,Xe),N2(),z2(),k("scale-readout").textContent=zt?"IMMERSION \xB7 d\xE9placement libre de la cam\xE9ra":"LARGEUR AU PLAN DE VIS\xC9E \xB7 "+et(n)+" millions d\u2019al",k("camera-readout").textContent="Cam\xE9ra \xE0 "+et(Xe.position.length())+" millions d\u2019al du Soleil",k("view-note").textContent=zt?"Cam\xE9ra libre \xB7 aucune dur\xE9e de voyage simul\xE9e":mt.mesh.visible?"Aper\xE7u de classe \xB7 forme et \xE9clat illustratifs":Ui?"Positions catalogu\xE9es \xB7 formes des galaxies de rep\xE8re illustratives":"Catalogue non disponible \xB7 rep\xE8res sch\xE9matiques",k("ruler").textContent=et(n*100/xt.clientWidth,n<1?3:1)+" millions d\u2019al"}var $u=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function B2(i){let e=yn[i.key],t=i.raw,n=bu(i.p);Zn.select(i),mt.select(i),k("kind").textContent="Galaxie catalogu\xE9e \xB7 "+e.name,k("name").textContent=i.name,k("distance").textContent=et(i.d,i.d<1?4:2)+" millions d\u2019al \xB7 "+et(i.mpc,3)+" Mpc",k("summary").textContent=i.key==="cf4"?"Distance d\xE9duite du module publi\xE9 : \u03BC = "+et(i.dm,3)+" \xB1 "+et(i.eDm,3)+" mag. Intervalle obtenu avec \u03BC \xB1 \u03C3 : "+i.interval.map(s=>et(s*Pn,2)).join(" \xE0 ")+" millions d\u2019al. Le segment orange montre cet intervalle radial, sans inclure toutes les erreurs syst\xE9matiques.":i.key==="ungc"?"Distance compil\xE9e dans UNGC. Morphologie : "+(t[5]||"non renseign\xE9e")+". Incertitude individuelle non fournie dans cet export.":"Association historique : "+(t[5]||"non renseign\xE9e")+" ; sous-groupe : "+(t[4]||"non renseign\xE9")+". Morphologie : "+(t[6]||"non renseign\xE9e")+(t[7]?" ; distance marqu\xE9e incertaine dans le catalogue.":". Erreur chiffr\xE9e non fournie dans cet export."),k("relation").textContent=i.key==="cf4"?"Indicateurs : "+(i.methods.join(", ")||"non renseign\xE9s")+". Groupe du catalogue identifi\xE9 par PGC "+i.groupPgc+". Cette identification ne prouve pas l\u2019appartenance \xE0 Laniakea.":"Une entr\xE9e historique du relev\xE9, sans appartenance \xE0 un bassin cosmique d\xE9duite de sa proximit\xE9. "+e.limit,k("coordinates").textContent="Direction \xE9quatoriale J2000 : \u03B1 "+et(i.ra,5)+"\xB0, \u03B4 "+et(i.dec,5)+"\xB0. X / Y / Z : "+i.p.map(s=>et(s,3)).join(" / ")+" millions d\u2019al. SGX / SGY / SGZ : "+n.map(s=>et(s,3)).join(" / ")+" millions d\u2019al.",k("extent").textContent=(i.key==="cf4"?"Vitesse radiale publi\xE9e dans le r\xE9f\xE9rentiel CMB : "+et(i.vCmb,0)+" km/s. Ce n\u2019est pas la vitesse particuli\xE8re 3D. ":i.key==="ungc"&&t[4]!=null?"Vitesse radiale h\xE9liocentrique : "+et(t[4],0)+" km/s. ":"")+"Le point de rep\xE9rage ne repr\xE9sente aucune taille physique. Aper\xE7u rapproch\xE9 : "+mt.object.classSource+". Taille : "+mt.object.sizeSource+". Forme 3D, orientation et \xE9clat illustratifs, pas une photographie.  La position est une repr\xE9sentation cartographique de la distance du catalogue, pas une position future ni une reconstruction comobile FLRW. "+e.limit,k("sources").innerHTML='<a target="_blank" rel="noopener" href="'+e.url+'">Catalogue et description des colonnes \xB7 CDS/VizieR</a>',i.key==="cf4"&&(k("sources").innerHTML+='<a target="_blank" rel="noopener" href="https://simbad.cds.unistra.fr/simbad/sim-id?Ident=PGC%20'+t[0]+'">Identifier PGC '+t[0]+" dans SIMBAD</a>"),k("relations").replaceChildren(),k("flight").hidden=!1,k("flight").href="./cockpit.html?target="+encodeURIComponent(i.key+":"+i.raw[0]),k("flight").textContent="Visiter dans le cockpit \xB7 mod\xE8le de sa classe, pas une image",k("enter").textContent="Observer le mod\xE8le"}function z2(){let i=St.get($e),e=k("survey-marker");if(e.hidden=!0,i?.type!=="observed")return;let t=new E(...i.p).project(Xe);t.z<-1||t.z>1||Math.abs(t.x)>1||Math.abs(t.y)>1||(e.hidden=!1,e.textContent=i.name,e.style.left=Math.min(xt.clientWidth-130,Math.max(8,(t.x+1)*xt.clientWidth/2+10))+"px",e.style.top=Math.max(8,(1-t.y)*xt.clientHeight/2-28)+"px")}function Uo(){Ui&&(Yn=vu(dr,{query:k("survey-search").value,maxMpc:Number(k("survey-radius").value),maxError:Number(k("survey-error").value)}),Zn.setRows(Yn,Co),k("survey-count").textContent=et(Yn.length,0)+" / "+et(dr.length,0)+" entr\xE9es affich\xE9es \xB7 "+Math.min(60,Yn.length)+" r\xE9sultats list\xE9s",k("survey-results").innerHTML=Yn.slice(0,60).map((i,e)=>'<button data-survey="'+e+'">'+$u(i.name)+" \xB7 "+et(i.d,i.d<1?3:1)+" M al</button>").join("")||"<small>Aucune galaxie ne correspond aux filtres.</small>",St.get($e)?.type==="observed"&&!Yn.some(i=>i.id===$e)&&($e=hi[bt].focus,Lo()))}async function No(i=!1){let e=k("survey-catalogue").value,t=e==="auto"?bt===0?"mcconnachie":bt===1?"ungc":"cf4":e;if(t===Co&&Ui&&!i)return;let n=++hc;Ui=!1,dr=[],Yn=[],Zn.setRows([],t),Zn.select(null),St.get($e)?.type==="observed"&&($e=hi[bt].focus,Lo()),k("survey-status").textContent="Chargement de "+yn[t].name+"\u2026",k("survey-retry").hidden=!0,k("survey-results").replaceChildren(),k("survey-count").textContent="";try{let s=Hu.get(t);if(!s){let r=await fetch("./"+yn[t].file);if(!r.ok)throw Error("HTTP "+r.status);s=ac(t,await r.json()).sort((a,o)=>a.d-o.d),Hu.set(t,s)}if(n!==hc)return;Co=t,dr=s,Ui=!0,k("survey-status").textContent=yn[t].name,k("survey-limit").textContent=yn[t].limit,k("survey-error-label").hidden=t!=="cf4",Uo()}catch(s){if(n!==hc)return;k("survey-status").textContent="Catalogue indisponible. Les rep\xE8res de la carte restent utilisables.",k("survey-limit").textContent=s.message,k("survey-retry").hidden=!1}}k("survey-catalogue").onchange=()=>No();k("survey-retry").onclick=()=>No(!0);var Xu;k("survey-search").oninput=()=>{clearTimeout(Xu),Xu=setTimeout(Uo,160)};k("survey-radius").onchange=k("survey-error").onchange=Uo;k("survey-results").onclick=i=>{let e=i.target.closest("[data-survey]");if(e){let t=Yn[+e.dataset.survey];St.set(t.id,t),tn(t.id)}};k("survey-top").onclick=()=>{Yu(),Mt=null;let i=Math.max(.1,Xe.position.distanceTo(gt.target));Xe.up.set(...Yt[1]),Xe.position.copy(gt.target).add(new E(...Yt[2]).multiplyScalar(i)),gt.update()};var fc=new URLSearchParams(location.search);pr(Math.min(3,Math.max(0,Number(fc.get("level"))||0)),!0);St.has(fc.get("target"))&&mc(fc.get("target"),!0);k("loading").hidden=!0;requestAnimationFrame(Ku);Object.defineProperty(window,"cosmicSnapshot",{value:()=>({level:bt,selected:$e,immersion:zt,transitioning:!!Mt,camera:Xe.position.toArray(),up:Xe.up.toArray(),target:gt.target.toArray(),structures:xn.length,visible:In.entries.filter(i=>i.mesh.visible).map(i=>i.o.id),referenceMarkers:In.entries.filter(i=>i.pick.visible).map(i=>i.o.id),boost:In.material.uniforms.boost.value,preview:{id:mt.row?.id||null,visible:mt.mesh.visible,shape:mt.object?.shapeCode??null,radiusMly:mt.object?mt.object.radiusLy/1e6:null,duplicate:mt.duplicate},geometry:"catalogue markers, selected class volume and optional illustrative 3D ellipsoids",survey:{key:Co,ready:Ui,total:dr.length,shown:Yn.length,selected:St.get($e)?.type==="observed"?$e:null,synthetic:k("synthetic").checked,supergalactic:k("survey-plane").checked},pixels:Ss.getDrawingBufferSize(new fe).toArray(),basins:{status:Pt.status,visible:Pt.root.visible,shells:Pt.entries.filter(i=>i.mesh.visible).map(i=>i.basin.name),lines:!!Pt.lines?.visible,labels:[...uc.values()].filter(i=>!i.hidden).map(i=>i.textContent)}})});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
