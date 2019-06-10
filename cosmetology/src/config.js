const sexMap = new Map();
sexMap.set(0,'男');
sexMap.set(1,"女");

const heathMap = new Map();
heathMap.set(0,'良好');
heathMap.set(1,"一般");

const politicsMap = new Map();
politicsMap.set(0,'群众');
politicsMap.set(1,"团员");
politicsMap.set(2,"中共党员");

const marryMap = new Map();
marryMap.set(0,'未婚');
marryMap.set(1,"已婚");

const educationMap = new Map();
educationMap.set(0,'本科及以上');
educationMap.set(1,"专科");
educationMap.set(2,'高中');
educationMap.set(3,"初中及以下");

const workstateMap = new Map();
workstateMap.set(0,'休假');
workstateMap.set(1,"空闲");
workstateMap.set(2,'忙碌');
workstateMap.set(3,"离线");

const contractMap = new Map();
contractMap.set(0,'正式期');
contractMap.set(1,"试用期");

const inofficeMap = new Map();
inofficeMap.set(1,'是');
inofficeMap.set(2,"否");

const usertypeMap = new Map();
usertypeMap.set(1,'店长');
usertypeMap.set(2,"收银员");
usertypeMap.set(3,"仓库管理员");
usertypeMap.set(4,"技师");

export default {
  'sex':sexMap,
  'heath':heathMap,
  'politics':politicsMap,
  'marry':marryMap,
  'education':educationMap,
  'workstate':workstateMap,
  'contract':contractMap,
  'inoffice':inofficeMap,
  "usertype":usertypeMap
}
