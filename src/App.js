import React,{useState,useRef,useEffect} from 'react';
import htm from 'htm';
const html=htm.bind(React.createElement);

const inr=n=>'₹'+n.toLocaleString('en-IN');
const EMP='Employer Sponsored', SELF='Worker Self-Paid ₹45/mo';
const seed=[['Ramesh Kumar','+91 98765 43210','Bihar'],['Sunita Devi','+91 97780 11223','Odisha'],['Arjun Das','+91 98300 55671','West Bengal'],['Manoj Yadav','+91 99350 88214','Uttar Pradesh']];
const STATES=['Bihar','Odisha','West Bengal','Uttar Pradesh','Jharkhand','Madhya Pradesh','Rajasthan','Assam','Chhattisgarh'];
const mk=([name,phone,state],i)=>({id:'WRK-'+(101+i),name,phone,state,trade:'Construction',mode:EMP,status:'Active'});
let mid=0; const M=(w,o)=>({id:++mid,w,from:'bot',...o});
const welcomeMsgs=w=>[M(w,{type:'text',text:'नमस्ते! 🙏 आपका सुरक्षा पास तैयार है।\nWelcome! Your Suraksha Pass is ready.'}),M(w,{type:'card'})];
const initW=seed.map(mk);
const initM=initW.flatMap(w=>welcomeMsgs(w.id));
const stamp=()=>new Date().toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});
const initLog=initW.map((w,i)=>({ts:'0'+(3+i)+' Nov 2026, 10:1'+i+' am',phone:w.phone,lang:'EN + HI',ver:'v1.0',outcome:'Agreed (P1+P2)'}));
function Consent({m,onDecide}){
 const [p1,setP1]=useState(false),[p2,setP2]=useState(false);
 const Row=(v,set,t)=>html`<label className="flex gap-2 items-start text-[12px] cursor-pointer"><input type="checkbox" checked=${v} disabled=${m.done} onChange=${e=>set(e.target.checked)} className="mt-0.5"/><span>${t}</span></label>`;
 const btn='flex-1 rounded-lg py-1.5 text-[12px] font-semibold border disabled:opacity-40 ';
 return html`<div className="max-w-[94%] bg-white rounded-lg shadow-sm p-2.5 text-[12px] space-y-1.5">
 <div className="font-semibold">🛡️ Suraksha Pass – Privacy & Consent Notice (गोपनीयता और सहमति सूचना)</div>
 <div><b>English:</b> Welcome! Suraksha Tech Pvt. Ltd. collects your Name, Mobile Number, Home State, Last 4 Digits of ID, and Hospital/Injury Slips strictly for two purposes: (1) Providing 24/7 doctor calls & pharmacy discounts via Suraksha. (2) Forwarding your details to [Partner Insurer Name] to process your employer-sponsored accident cover and injury claims.<br/>• Your data is encrypted and never sold to third parties.<br/>• You can view, correct, or delete your data anytime by replying STOP / DELETE or calling our Grievance Officer at [+91-XXXXXXXXXX].</div>
 <div><b>हिंदी:</b> नमस्ते! Suraksha Tech Pvt. Ltd. आपका नाम, मोबाइल नंबर, गृह राज्य, पहचान पत्र के अंतिम 4 अंक, और अस्पताल/चोट की पर्ची केवल दो कामों के लिए ले रहा है: (1) 24/7 डॉक्टर कॉल और दवाइयों पर छूट देने के लिए। (2) आपकी दुर्घटना बीमा पॉलिसी और क्लेम प्रोसेस करने के लिए आपका विवरण [Partner Insurer Name] को भेजने के लिए।<br/>• आपका डेटा सुरक्षित है और किसी को बेचा नहीं जाता।<br/>• आप कभी भी STOP लिखकर या [+91-XXXXXXXXXX] पर कॉल करके अपनी सहमति वापस ले सकते हैं और अपना डेटा हटवा सकते हैं।</div>
 <div className="border-t pt-1.5 space-y-1">${Row(p1,setP1,'Purpose 1 – Doctor calls & pharmacy discounts (डॉक्टर और दवा छूट)')}${Row(p2,setP2,'Purpose 2 – Share my details with the insurer for accident cover & claims (बीमा के लिए विवरण साझा करें)')}</div>
 ${m.done?html`<div className="text-[11px] text-slate-500">✓ Response recorded</div>`:html`<div><div className="text-[11px] mb-1">👇 Tap below to confirm (सहमति देने के लिए नीचे दबाएं):</div><div className="flex gap-1.5"><button disabled=${!p1} onClick=${()=>onDecide(m,true,p1,p2)} className=${btn+'bg-emerald-50 text-emerald-800 border-emerald-300'}>✅ I Agree / मैं सहमत हूँ</button><button onClick=${()=>onDecide(m,false,false,false)} className=${btn+'bg-red-50 text-red-700 border-red-200'}>❌ Decline / अस्वीकार</button></div></div>`}</div>`}

function Qr(){const c=[1,1,1,0,1,1,1,1,0,1,0,0,0,1,1,1,1,0,1,1,0,1,0,1,1,0,0,0,1,0,1,1,0,1,1,1,1,0,1,0,1];return html`<svg viewBox="0 0 7 7" className="w-12 h-12 bg-white p-1 rounded">${c.slice(0,49).map((v,i)=>v?html`<rect key=${i} x=${i%7} y=${Math.floor(i/7)} width="1" height="1" fill="#0f172a"/>`:null)}</svg>`}

function Card({w}){return html`<div className="rounded-xl overflow-hidden text-white bg-gradient-to-br from-emerald-700 to-teal-900 p-3 w-64 shadow">
<div className="flex justify-between items-start"><div><div className="text-[10px] tracking-wide opacity-80">PORTABLE SURAKSHA HEALTH & ACCIDENT CARD</div>
<div className="font-semibold text-base mt-1">${w.name}</div><div className="text-xs opacity-90">${w.id} • ${w.state}</div></div><${Qr}/></div>
<div className="mt-2 space-y-1"><div className="text-[11px] bg-white/15 rounded px-2 py-1">🩺 24/7 Free Doctor (Suraksha)</div>
${w.p2!==false&&html`<div className="text-[11px] bg-white/15 rounded px-2 py-1">🛡️ ₹1L Group PA Cover (Underwritten by Partner Insurer)</div>`}</div>
<div className="mt-2 text-[10px] flex justify-between"><span>${w.mode===EMP?'Employer Sponsored':'Self-Paid OPD Pass'}</span><span className=${w.status==='Active'?'text-emerald-200':'text-amber-200'}>${w.status==='Active'?'● Active':'● Exited Site'}</span></div>
${w.mode===SELF&&html`<div className="mt-1 text-[10px] bg-white/15 rounded px-2 py-1">GPA group cover ended with site exit. Retail PA optional via licensed partner.</div>`}</div>`}

function App(){
const [workers,setW]=useState(initW),[msgs,setM]=useState(initM),[sel,setSel]=useState('WRK-101'),[view,setView]=useState('split'),[modal,setModal]=useState(false),[typing,setTyping]=useState(null),[busy,setBusy]=useState(false),[log,setLog]=useState(initLog);
const [f,setF]=useState({name:'',phone:'',state:'Bihar',trade:'Construction'});
const end=useRef(null);
useEffect(()=>{end.current&&end.current.scrollIntoView({block:'end'})},[msgs,typing,sel]);
const add=(...a)=>setM(m=>[...m,...a]);
const wk=workers.find(w=>w.id===sel)||workers[0];
const sponsored=workers.filter(w=>w.mode===EMP&&w.status==='Active').length;
const cover=workers.filter(w=>w.mode===EMP&&w.status==='Active'&&w.p2!==false).length;
const locked=!['Active','Exited Site'].includes(wk.status);
const later=(ms,fn)=>setTimeout(fn,ms);
const upd=(id,p)=>setW(ws=>ws.map(w=>w.id===id?{...w,...p}:w));

function enroll(){
 if(!f.name.trim()||!f.phone.trim())return;
 const id='WRK-'+(101+workers.length); const w={id,name:f.name.trim(),phone:'+91 '+f.phone.replace(/^\+?91\s?/,''),state:f.state,trade:f.trade,mode:EMP,status:'Pending Consent'};
 setW(ws=>[...ws,w]); add(M(id,{type:'consent'})); setSel(id); setF({...f,name:'',phone:''});
}
const portability=id=>{add(M(id,{type:'text',text:'Left your job site? Your Health ID travels with you across India! 🇮🇳\nसाइट छोड़ दी? आपकी Health ID पूरे भारत में आपके साथ चलेगी।\nKeep your 24/7 Regional Doctor & Pharmacy Pass active for ₹45/month via UPI (plus optional retail accident cover via our licensed partner).'}),M(id,{type:'cta',kind:'upi'}))};
function exitSite(id){upd(id,{status:'Exited Site'}); setSel(id); portability(id)}
function doctor(){
 add({id:++mid,w:sel,from:'user',type:'text',text:'👨‍⚕️ Talk to Doctor (24/7 OPD)'});
 setTyping(sel); later(900,()=>{setTyping(null);add(M(sel,{type:'text',text:'डॉक्टर से जोड़ रहे हैं… / Connecting you to a Hindi-speaking doctor…'}));later(900,()=>add(M(sel,{type:'doctor'})))});
}
function claim(){
 add({id:++mid,w:sel,from:'user',type:'text',text:'🏥 Report Injury & Claim'});
 later(600,()=>add(M(sel,{type:'text',text:'हमें खेद है। कृपया अस्पताल/OPD पर्ची अपलोड करें।\nSorry to hear that. Please upload your hospital / OPD slip.'}),M(sel,{type:'cta',kind:'upload'})));
}
function changed(){add({id:++mid,w:sel,from:'user',type:'text',text:'🔄 Changed Job / City (Portability)'});later(500,()=>portability(sel))}
function decide(m,ok,p1,p2){const w=workers.find(x=>x.id===m.w);done(m.id);
 setLog(l=>[{ts:stamp(),phone:w.phone,lang:'EN + HI',ver:'v1.0',outcome:ok?'Agreed ('+(p2?'P1+P2':'P1 only')+')':'Declined'},...l]);
 if(ok){upd(w.id,{status:'Active',p2});add(M(w.id,{type:'text',text:'धन्यवाद! आपकी सहमति दर्ज हो गई।\nThank you! Your consent is recorded.'+(p2?'':'\nNote: without Purpose 2, accident cover and claims cannot be processed.')}),M(w.id,{type:'card'}))}
 else{upd(w.id,{status:'Consent Declined'});add(M(w.id,{type:'text',text:'ठीक है। हमने आपका कोई डेटा सेव नहीं किया।\nUnderstood. No data was collected.'}))}}
function stop(){const w=wk;add({id:++mid,w:w.id,from:'user',type:'text',text:'STOP / DELETE'});upd(w.id,{status:'Data Deleted'});
 setLog(l=>[{ts:stamp(),phone:w.phone,lang:'EN + HI',ver:'v1.0',outcome:'Withdrawn / deletion requested'},...l]);
 later(500,()=>add(M(w.id,{type:'text',text:'आपकी सहमति वापस ले ली गई। डेटा हटाने का अनुरोध दर्ज।\nConsent withdrawn. Deletion request logged.'})))}
const done=id=>setM(m=>m.map(x=>x.id===id?{...x,done:true}:x));
function cta(m){
 if(m.done||busy)return; const id=m.w;
 if(m.kind==='upload'){done(m.id);setBusy(true);setTyping(id);add(M(id,{type:'text',text:'⏳ Pre-Checking Documents… / दस्तावेज़ जाँच रहे हैं…'}));
  later(1500,()=>{setTyping(null);setBusy(false);add(M(id,{type:'text',text:'✅ Claim Intimation #CLM-882 Submitted to Insurer! Your documents passed pre-check and are queued for insurer approval (24–48 hrs). Need urgent cash today? Tap below for a ₹500 Employer Emergency Advance.'}),M(id,{type:'cta',kind:'advance'}))})}
 if(m.kind==='advance'){done(m.id);setBusy(true);setTyping(id);later(1200,()=>{setTyping(null);setBusy(false);add(M(id,{type:'text',text:'💸 ₹500 sent to your UPI (Ref UPI'+(48210937+m.id)+') from your employer’s imprest. Logged in your employer’s wage-advance register (0% interest). The insurer’s claim decision is separate.\n₹500 आपके UPI में भेज दिए गए।'}))})}
 if(m.kind==='upi'){done(m.id);setBusy(true);setTyping(id);later(1200,()=>{setTyping(null);setBusy(false);upd(id,{mode:SELF,status:'Active'});add(M(id,{type:'text',text:'✅ ₹45 paid via UPI. Your 24/7 Doctor & Pharmacy Pass is active — renews monthly.\n₹45 का भुगतान सफल।'}),M(id,{type:'card'}))})}
}
const label={upload:'📎 Upload Hospital / OPD Slip',advance:'Request ₹500 Emergency Advance',upi:'Pay ₹45 via UPI'};
const my=msgs.filter(m=>m.w===wk.id);

const Dash=html`<div className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"><div className="text-xs text-slate-500">Active Covered Workers</div><div className="text-4xl font-bold mt-1">${workers.filter(w=>w.status==='Active').length}</div><div className="text-xs text-slate-500 mt-1">${sponsored} employer-sponsored • ${workers.filter(w=>w.mode===SELF&&w.status==='Active').length} self-paid</div></div>
 <div className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-slate-200"><div className="text-xs text-slate-500 mb-2">Monthly Billing – two separate invoices, two separate payees</div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg"><div className="text-xs font-semibold text-emerald-800 uppercase">Invoice 1: Suraksha Tech Pvt. Ltd.</div>
   <div className="text-xl font-bold text-emerald-950">${inr(sponsored*45)} <span className="text-xs font-normal">+ 18% GST (${inr(Math.round(sponsored*45*0.18))})</span></div>
   <div className="text-xs text-emerald-700 mt-1">SaaS & 24/7 OPD Pass (${sponsored} × ₹45) • Paid to Suraksha</div></div>
  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg"><div className="text-xs font-semibold text-blue-800 uppercase">Invoice 2: Partner Insurer (Direct)</div>
   <div className="text-xl font-bold text-blue-950">${inr(cover*35)} <span className="text-xs font-normal">(Zero Markup)</span></div>
   <div className="text-xs text-blue-700 mt-1">₹1L Group PA Policy (${cover} × ₹35, Risk Class III) • Paid to Insurer Nodal A/C • GST per insurer invoice</div></div></div></div>
 <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"><div className="text-xs text-slate-500">Statutory & Welfare Readiness</div><div className="mt-2 inline-block text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1">ESIC / BOCW Tracked + Supplemental GPA Active</div>
  <button onClick=${()=>setModal(true)} className="mt-3 w-full text-sm bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-700">Generate Site Welfare Audit Report</button></div>
</div>
<div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"><div className="font-semibold text-sm mb-2">Quick Enroll Worker</div>
 <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
  <input value=${f.name} onChange=${e=>setF({...f,name:e.target.value})} placeholder="Name" className="border rounded-lg px-3 py-2 text-sm"/>
  <input value=${f.phone} onChange=${e=>setF({...f,phone:e.target.value})} placeholder="+91 Phone" className="border rounded-lg px-3 py-2 text-sm"/>
  <select value=${f.state} onChange=${e=>setF({...f,state:e.target.value})} className="border rounded-lg px-2 py-2 text-sm">${STATES.map(s=>html`<option key=${s}>${s}</option>`)}</select>
  <select value=${f.trade} onChange=${e=>setF({...f,trade:e.target.value})} className="border rounded-lg px-2 py-2 text-sm"><option>Construction</option><option>Logistics</option></select>
  <button onClick=${enroll} className="bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 py-2 col-span-2 lg:col-span-1">+ Enroll Worker</button></div></div>
<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-xs text-slate-500 bg-slate-50"><tr>${['ID','Name','Home State','Coverage Mode','Status','Actions'].map(h=>html`<th key=${h} className="px-3 py-2">${h}</th>`)}</tr></thead><tbody>
${workers.map(w=>html`<tr key=${w.id} className=${'border-t '+(w.id===sel?'bg-emerald-50/60':'')}><td className="px-3 py-2 font-mono text-xs">${w.id}</td><td className="px-3 py-2 font-medium">${w.name}<div className="text-[11px] text-slate-400">${w.phone}</div></td><td className="px-3 py-2">${w.state}</td>
<td className="px-3 py-2"><span className=${'text-xs px-2 py-0.5 rounded-full '+(w.mode===EMP?'bg-blue-50 text-blue-700':'bg-violet-50 text-violet-700')}>${w.mode}</span></td>
<td className="px-3 py-2"><span className=${'text-xs px-2 py-0.5 rounded-full '+(w.status==='Active'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700')}>${w.status}</span></td>
<td className="px-3 py-2 whitespace-nowrap"><button onClick=${()=>setSel(w.id)} className="text-xs text-slate-600 underline mr-3">Open chat</button><button disabled=${w.status!=='Active'||w.mode!==EMP} onClick=${()=>exitSite(w.id)} className="text-xs border rounded px-2 py-1 hover:bg-amber-50 disabled:opacity-40">Simulate Site Exit</button></td></tr>`)}
</tbody></table></div>
<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto"><div className="px-3 pt-3 text-sm font-semibold">DPDP Consent Log <span className="text-xs font-normal text-slate-500">(append-only audit trail)</span></div>
<table className="w-full text-xs"><thead className="text-left text-slate-500"><tr>${['consent_timestamp','worker_phone','language_shown','consent_version','outcome'].map(h=>html`<th key=${h} className="px-3 py-2 font-mono">${h}</th>`)}</tr></thead><tbody>${log.map((l,i)=>html`<tr key=${i} className="border-t"><td className="px-3 py-1.5">${l.ts}</td><td className="px-3 py-1.5">${l.phone}</td><td className="px-3 py-1.5">${l.lang}</td><td className="px-3 py-1.5">${l.ver}</td><td className="px-3 py-1.5">${l.outcome}</td></tr>`)}</tbody></table></div></div>`;

const Phone=html`<div className="mx-auto w-[340px] max-w-full rounded-[2rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden">
<div className="bg-[#075e54] text-white px-3 py-2 flex items-center gap-2"><div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">🛡️</div><div className="flex-1 leading-tight"><div className="text-sm font-semibold">Suraksha Pass 🛡️ • Verified Partner</div><div className="text-[10px] opacity-80">${typing===wk.id?'typing…':'online'}</div></div></div>
<div className="bg-[#054c44] text-white text-[10px] px-2 py-1 flex items-center gap-1">Chatting as <select value=${wk.id} onChange=${e=>setSel(e.target.value)} className="bg-transparent border border-white/30 rounded px-1 text-white">${workers.map(w=>html`<option className="text-black" key=${w.id} value=${w.id}>${w.name} (${w.id})</option>`)}</select></div>
<div className="chat h-[460px] overflow-y-auto p-2 space-y-2">
${my.map(m=>html`<div key=${m.id} className=${'pop flex '+(m.from==='user'?'justify-end':'justify-start')}>
 ${m.type==='text'&&html`<div className=${'max-w-[85%] text-[13px] rounded-lg px-2.5 py-1.5 whitespace-pre-line shadow-sm '+(m.from==='user'?'bg-[#dcf8c6]':'bg-white')}>${m.text}</div>`}
 ${m.type==='card'&&html`<${Card} w=${wk}/>`}
 ${m.type==='consent'&&html`<${Consent} m=${m} onDecide=${decide}/>`}
 ${m.type==='doctor'&&html`<div className="bg-white rounded-lg p-3 w-64 shadow-sm text-[13px]"><div className="flex items-center gap-2"><div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">👩‍⚕️</div><div><div className="font-semibold">Dr. Priya Sharma, MBBS</div><div className="text-[11px] text-slate-500">Hindi • Bhojpuri • English</div></div></div>
 <div className="mt-2 bg-slate-900 text-white rounded-lg h-20 flex items-center justify-center text-xs">🔴 Live video consult • 00:00</div>
 <div className="mt-2 border border-dashed border-emerald-500 rounded p-2 text-center"><div className="text-[10px] text-slate-500">Medicine code</div><div className="font-bold text-emerald-700">SURAKSHA20</div><div className="text-[11px]">20% Off at Partner Pharmacies</div></div></div>`}
 ${m.type==='cta'&&html`<div className="max-w-[88%]"><button onClick=${()=>cta(m)} disabled=${m.done} className=${'text-[13px] font-semibold rounded-lg px-3 py-2 shadow-sm border '+(m.done?'bg-slate-100 text-slate-400':'bg-white text-[#0a7cff] hover:bg-slate-50')}>${m.done?'✓ ':''}${label[m.kind]}</button>
 ${m.kind==='advance'&&html`<div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900"><strong>Need urgent cash today?</strong> Request ₹500 Employer Welfare Grant / Statutory Wage Advance<span className="block text-[11px] text-amber-700 mt-0.5">(0% Interest • Funded by Employer Imprest • Logged in the employer’s wage-advance register)</span></div>`}</div>`}
</div>`)}
${typing===wk.id&&html`<div className="bg-white rounded-lg px-3 py-2 text-xs w-14 shadow-sm">• • •</div>`}
<div ref=${end}></div></div>
<div className="bg-[#f0f0f0] p-2 space-y-1">
 <button onClick=${doctor} disabled=${locked} className="w-full text-[13px] disabled:opacity-40 bg-white rounded-lg py-1.5 text-[#0a7cff] font-medium shadow-sm">👨‍⚕️ Talk to Doctor (24/7 OPD)</button>
 <button onClick=${claim} disabled=${locked} className="w-full text-[13px] disabled:opacity-40 bg-white rounded-lg py-1.5 text-[#0a7cff] font-medium shadow-sm">🏥 Report Injury & Claim</button>
 <button onClick=${changed} disabled=${locked} className="w-full text-[13px] disabled:opacity-40 bg-white rounded-lg py-1.5 text-[#0a7cff] font-medium shadow-sm">🔄 Changed Job / City (Portability)</button>
 <button onClick=${stop} disabled=${['Data Deleted','Consent Declined'].includes(wk.status)} className="w-full text-[11px] text-slate-500 underline disabled:opacity-40">🗑️ STOP / DELETE my data (सहमति वापस लें)</button></div></div>`;

return html`<div className="max-w-[1400px] mx-auto p-3 md:p-5">
<div className="flex flex-wrap items-center justify-between gap-3 mb-3"><div className="flex items-center gap-2"><div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg">🛡️</div><div><div className="font-bold leading-tight">Suraksha Pass</div><div className="text-[11px] text-slate-500">Migrant worker health & welfare</div></div></div>
 <div className="flex bg-white rounded-lg border p-1 text-sm">${[['split','Split Screen'],['dash','Contractor'],['phone','Worker WhatsApp']].map(([k,l])=>html`<button key=${k} onClick=${()=>setView(k)} className=${'px-3 py-1 rounded-md '+(view===k?'bg-slate-900 text-white':'text-slate-600')}>${l}</button>`)}</div></div>
<div className="mb-4"><span className="inline-block text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200 rounded-full px-3 py-1">IRDAI-Compliant Architecture • Direct Insurer Master Policy + Standalone OPD SaaS</span></div>
<div className=${view==='split'?'grid lg:grid-cols-[1fr_360px] gap-6 items-start':''}>${view!=='phone'&&html`<div>${Dash}</div>`}${view!=='dash'&&html`<div className=${view==='split'?'lg:sticky lg:top-4':''}>${Phone}</div>`}</div>
${modal&&html`<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick=${()=>setModal(false)}><div className="bg-white rounded-xl max-w-lg w-full p-5 max-h-[90vh] overflow-y-auto" onClick=${e=>e.stopPropagation()}>
 <div className="flex justify-between"><div className="font-bold">Site Welfare Audit Report</div><button onClick=${()=>setModal(false)}>✕</button></div>
 <div className="text-xs text-slate-500 mb-3">Generated 12 Nov 2026 • Sample Site, Bengaluru</div>
 <table className="w-full text-xs"><thead className="text-left text-slate-500"><tr><th>Worker</th><th>ESIC / BOCW</th><th>Supplemental GPA</th></tr></thead><tbody>${workers.map(w=>html`<tr key=${w.id} className="border-t"><td className="py-1.5">${w.name}<div className="text-slate-400">${w.id}</div></td><td>Tracked</td><td>${w.mode===EMP&&w.status==='Active'&&w.p2!==false?'✅ ₹1L active':'— Not on master policy'}</td></tr>`)}</tbody></table>
 <div className="mt-3 text-[11px] bg-slate-50 rounded p-2">Statutory ESIC / BOCW registration is tracked, not replaced. The ₹1L GPA is a supplemental master policy held directly by the contractor with the partner insurer; premium of ${inr(cover*35)}/mo is paid to the insurer’s nodal account. This report is not a legal compliance certificate.</div>
 <button onClick=${()=>window.print()} className="mt-3 text-sm bg-slate-900 text-white rounded-lg px-3 py-2">Print / Save PDF</button></div></div>`}
</div>`}

export default App;
