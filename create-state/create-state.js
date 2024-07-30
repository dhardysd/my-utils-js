/**
 * @template T
 * @param {T} initial
 */
export function createState(initial) {
    const subs = [];
    let current = initial;
    
    return {
        get value() {
            return current;
        },
        set value(newValue) {
            let next = true;

            if (subs.length === 0) return;
            subs.forEach(fn => {
                if (next) {
                    next = fn(newValue, current) ?? true;
                }
            });

            if (next) {
                current = newValue;
            }
        },
        /**
         * @param {(newvalue: T, oldvalue: T) Boolean?} fn
         */
        effect: function(fn) {
            subs.push(fn);
        }
    }
}