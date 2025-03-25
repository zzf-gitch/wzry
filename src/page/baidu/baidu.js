export default function loadBMap(dsLzkI0syN4mjOwVfVmc7TFUkMNTjWYR) {
    return new Promise(function(resolve, reject) {
        if (typeof BMap !== 'undefined') {
            resolve(BMap)
            return true
        }
        window.onBMapCallback = function() {
            resolve(BMap)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            'http://api.map.baidu.com/api?v=2.0&dsLzkI0syN4mjOwVfVmc7TFUkMNTjWYR=' + dsLzkI0syN4mjOwVfVmc7TFUkMNTjWYR + '&callback=onBMapCallback'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
