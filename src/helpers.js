import {Buffer} from 'safe-buffer';

export function formatCoin(coinSymbol) {
    const buf = new Buffer(10);
    Buffer.from(coinSymbol.toUpperCase()).copy(buf, 0, 0, 10);

    return buf;
}
