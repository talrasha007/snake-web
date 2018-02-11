import web3 from '../lib/web3';

const cooldowns = [
  '1分钟',
  '2分钟',
  '5分钟',
  '10分钟',
  '30分钟',
  '1小时',
  '2小时',
  '4小时',
  '8小时',
  '16小时',
  '1天',
  '2天',
  '4天',
  '7天'
];

export function cooldown(i) {
  return cooldowns[i] || '7天';
}

export function wei(v) {
  return v >= 0 && Math.floor(web3.fromWei(v) * Math.pow(10, 5)) / Math.pow(10, 5);
}

export function genes(g) {
  return g && g.toString(16);
}
