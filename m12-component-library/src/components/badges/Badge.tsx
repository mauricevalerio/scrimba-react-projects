import { getColor } from './utils'

type BadgeProp = {
    text?: string,
    shape?: string,
    color?: string
}

export const Badge = (
    { text = 'badge',
        shape,
        color = 'gray' }: BadgeProp) =>
    <p className={`p__badge ${shape === 'pill' ? 'pill' : 'square'}`} style={getColor(color)}>{text}</p>
