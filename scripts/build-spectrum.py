import csv,json,math,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1];R=root/'data';rows=[[float(x) for x in r] for r in csv.reader((R/'CIE_xyz_1931_2deg.csv').open())];lut=[]
for i in range(512):
 t=100*(10000**(i/511));xyz=[0,0,0]
 for nm,x,y,z in rows:
  w=nm/1000;v=1/(w**5*math.expm1(14387.76877/(w*t)))
  xyz=[xyz[0]+v*x,xyz[1]+v*y,xyz[2]+v*z]
 X,Y,Z=xyz;rgb=[3.2406*X-1.5372*Y-.4986*Z,-.9689*X+1.8758*Y+.0415*Z,.0557*X-.2040*Y+1.0570*Z]
 lut+= [max(0,c/Y) for c in rgb]+[math.log(max(Y,1e-300))]
(root/'public/assets/blackbody-lut.json').write_text(json.dumps(lut,separators=(',',':')))
