import { getColor } from './utils'

type BadgeProp = {
    text?: string,
    shape?: string,
    color: string
}

export const Badge = ({ text, shape, color }: BadgeProp) =>
    <div className={`badge badge__${shape === 'pill' ? 'pill' : 'square'}`}
        style={getColor(color)}>
        <p>{text ? text : 'Badge'}</p>
    </div>