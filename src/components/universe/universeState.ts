const KEY="universe-achievements-v1";
export const badges=[
 {id:"explorer",icon:"✦",en:"Explorer",vi:"Nhà thám hiểm",hint:"Open Universe Lab",hintVi:"Mở Universe Lab"},
 {id:"galaxy",icon:"◉",en:"Astronomer",vi:"Nhà thiên văn",hint:"Select a project planet",hintVi:"Chọn hành tinh dự án"},
 {id:"terminal",icon:"›_",en:"Command pilot",vi:"Phi công lệnh",hint:"Run a terminal command",hintVi:"Nhập lệnh terminal"},
 {id:"assistant",icon:"✧",en:"First contact",vi:"Tín hiệu đầu tiên",hint:"Ask the assistant",hintVi:"Hỏi trợ lý"},
 {id:"tour",icon:"▷",en:"Voyager",vi:"Du hành gia",hint:"Start a cinematic tour",hintVi:"Bắt đầu tham quan"},
 {id:"room-cat",icon:"🐱",en:"Cat whisperer",vi:"Bạn của mèo",hint:"Interact with the cat",hintVi:"Bấm vào mèo"},
 {id:"room-robot",icon:"🤖",en:"Robot friend",vi:"Bạn robot",hint:"Interact with the robot",hintVi:"Bấm vào robot"},
 {id:"room-skeleton",icon:"☠",en:"Night coder",vi:"Coder đêm",hint:"Find the skeleton",hintVi:"Tìm bộ xương"},
 {id:"room-chair",icon:"◌",en:"Spin master",vi:"Bậc thầy xoay",hint:"Spin the chair",hintVi:"Xoay ghế"},
 {id:"room-ball",icon:"⚽",en:"Gravity test",vi:"Thử trọng lực",hint:"Bounce the ball",hintVi:"Bấm vào bóng"},
 {id:"arcade",icon:"🎮",en:"Arcade pilot",vi:"Phi công arcade",hint:"Open the room game",hintVi:"Mở mini game"},
 {id:"secret",icon:"☄",en:"Hidden signal",vi:"Tín hiệu bí mật",hint:"Decode a secret terminal command or keyboard sequence",hintVi:"Giải mã lệnh hoặc chuỗi phím bí mật"}
] as const;
let session: string[]=[];
export function getAwards():string[]{try{const a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?[...new Set([...session,...a.filter((v):v is string=>typeof v==="string")])]:session.slice();}catch{return session.slice();}}
export function award(id:string){if(!badges.some(b=>b.id===id))return;const current=getAwards();if(current.includes(id))return;session=[...current,id];try{localStorage.setItem(KEY,JSON.stringify(session));}catch{}window.dispatchEvent(new Event("universe-achievement"));}
export function resetAwards(){session=[];try{localStorage.removeItem(KEY);}catch{}window.dispatchEvent(new Event("universe-achievement"));}
