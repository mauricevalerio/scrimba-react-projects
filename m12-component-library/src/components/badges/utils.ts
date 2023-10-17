type ColorLookUp = {
    [key: string]: {
        txtColor: string,
        bgColor: string
    }
}

type ColorStyle = {
    backgroundColor: string,
    color: string
}

export const getColor = (color: string): ColorStyle => {
    const colorLookup: ColorLookUp = {
        gray: {
            txtColor: '#1F2937',
            bgColor: '#F3F4F6'
        },
        red: {
            txtColor: '#991B1B',
            bgColor: '#FEE2E2'
        },
        yellow: {
            txtColor: '#92400E',
            bgColor: '#FEF3C7'
        },
        green: {
            txtColor: '#065F46',
            bgColor: '#D1FAE5'
        },
        blue: {
            txtColor: '#1E40AF',
            bgColor: '#DBEAFE'
        },
        indigo: {
            txtColor: '#3730A3',
            bgColor: '#E0E7FF'
        },
        purple: {
            txtColor: '#5B21B6',
            bgColor: '#EDE9FE'
        },
        pink: {
            txtColor: '#9D174D',
            bgColor: '#FCE7F3'
        }
    }

    if (typeof colorLookup[color as keyof ColorLookUp] === 'undefined') {
        return {
            backgroundColor: `${colorLookup['gray'].bgColor}`,
            color: `${colorLookup['gray'].txtColor}`
        }
    }

    return {
        backgroundColor: `${colorLookup[color as keyof ColorLookUp].bgColor}`,
        color: `${colorLookup[color as keyof ColorLookUp].txtColor}`
    }
}

