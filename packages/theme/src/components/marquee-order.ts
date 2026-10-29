// Both functions are serialized into an inline script via toString(),
// so they must stay self-contained (no imports, no outer references).

export function shuffleIndices(count: number): number[] {
  const arr: number[] = []
  for (let i = 0; i < count; i += 1) arr.push(i)
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}

/** ≥4：上下各一半互不重复；2–3 件：上下都出现，错开一位减少同步感 */
export function arrangeRows(order: number[]): number[][] {
  if (!order.length) return []
  if (order.length === 1) return [order]
  if (order.length >= 4) {
    const mid = Math.ceil(order.length / 2)
    return [order.slice(0, mid), order.slice(mid)]
  }
  return [order, order.slice(1).concat(order[0])]
}

export const ORDER_KEY = '__vwMarqueeOrder'

/**
 * Runs right after the marquee HTML is parsed, before hydration:
 * reorders SSR <li>s into a random arrangement and leaves the order on window
 * so the component renders the exact same DOM.
 */
export const marqueeBootScript = `<script>(function(){try{
var shuffleIndices=${shuffleIndices.toString()};
var arrangeRows=${arrangeRows.toString()};
var root=document.currentScript.parentNode.parentNode;
var n=+root.getAttribute('data-count');
var uls=[].filter.call(root.children,function(el){return el.tagName==='UL'});
var order=shuffleIndices(n);
var rows=arrangeRows(order);
if(rows.length!==uls.length)return;
var pool={},ends=[];
uls.forEach(function(ul){
  var lis=[].slice.call(ul.children);
  ends.push(lis[lis.length-1].nextSibling);
  lis.forEach(function(li){
    var k=li.getAttribute('data-i')+'-'+li.getAttribute('data-copy');
    (pool[k]||(pool[k]=[])).push(li);
  });
});
rows.forEach(function(row,r){
  var len=row.length;
  for(var k=0;k<len*2;k+=1){
    var li=pool[row[k%len]+'-'+(k>=len?1:0)].pop();
    uls[r].insertBefore(li,ends[r]);
  }
});
window.${ORDER_KEY}=order;
}catch(e){}})()</script>`
