import * as t from '../../themes/primitives'

const buttonDefault = {
  transition: 'background-color .1s ease, color .2s ease',
  backgroundColor: 'transparent', // t.gray['500']
  color: t.colors.text,
  fontFamily: t.fonts.text,
  fontWeight: 500,
  hover: {
    backgroundColor: 'transparent', // t.gray['600']
  },
}

export const buttonsDefault = {
  primary: {
    ...buttonDefault,
    color: 'white',
    backgroundColor: t.indigo[600],
    border: `1px solid ${t.indigo[600]}`,
    hover: {
      border: `1px solid ${t.indigo[700]}`,
      backgroundColor: t.indigo[700],
      borderColor: t.indigo[700],
      color: 'white',
    },
    active: {
      border: `1px solid ${t.indigo[800]}`,
      backgroundColor: t.indigo[800],
      color: 'white',
    },
    indigo: {
      backgroundColor: t.indigo[600],
      color: 'white',
      border: `1px solid ${t.indigo[600]}`,
      hover: {
        border: `1px solid ${t.indigo[700]}`,
        borderColor: t.indigo[700],
        backgroundColor: t.indigo[700],
        color: 'white',
      },
      active: {
        border: `1px solid ${t.indigo[800]}`,
        backgroundColor: t.indigo[800],
        color: 'white',
      },
    },
    teal: {
      backgroundColor: t.teal[600],
      color: 'white',
      border: `1px solid ${t.teal[600]}`,
      hover: {
        border: `1px solid ${t.teal[700]}`,
        backgroundColor: t.teal[700],
        borderColor: t.teal[700],
        color: 'white',
      },
      active: {
        border: `1px solid ${t.teal[800]}`,
        backgroundColor: t.teal[800],
        color: 'white',
      },
    },
    white: {
      backgroundColor: 'white',
      color: t.indigo[600],
      border: `1px solid white`,
      hover: {
        border: `1px solid white`,
        backgroundColor: 'white',
        borderColor: t.indigo[700],
        color: t.indigo[700],
      },
      active: {
        border: `1px solid white`,
        backgroundColor: 'white',
        color: t.indigo[800],
      },
    },
  },

  secondary: {
    ...buttonDefault,
    color: t.indigo[600],
    border: `1px solid ${t.indigo[600]}`,
    hover: {
      backgroundColor: 'white',
      color: t.indigo[700],
      borderColor: t.indigo[700],
      border: `1px solid ${t.indigo[700]}`,
    },
    active: {
      backgroundColor: 'white',
      color: t.indigo[800],
      border: `1px solid ${t.indigo[800]}`,
    },
    indigo: {
      backgroundColor: 'white',
      color: t.indigo[600],
      border: `1px solid ${t.indigo[600]}`,
      hover: {
        backgroundColor: 'white',
        border: `1px solid ${t.indigo[700]}`,
        borderColor: t.indigo[700],
        color: t.indigo[700],
      },
      active: {
        backgroundColor: 'white',
        border: `1px solid ${t.indigo[800]}`,
        color: t.indigo[800],
      },
    },
    teal: {
      backgroundColor: 'white',
      color: t.teal[600],
      border: `1px solid ${t.teal[600]}`,
      hover: {
        border: `1px solid ${t.teal[700]}`,
        backgroundColor: 'white',
        borderColor: t.teal[700],
        color: t.teal[700],
      },
      active: {
        border: `1px solid ${t.teal[800]}`,
        backgroundColor: 'white',
        color: t.teal[800],
      },
    },
    white: {
      backgroundColor: 'white',
      color: t.indigo[600],
      border: `1px solid ${t.indigo[600]}`,
      hover: {
        backgroundColor: 'white',
        border: `1px solid ${t.indigo[700]}`,
        borderColor: t.indigo[700],
        color: t.indigo[700],
      },
      active: {
        backgroundColor: 'white',
        border: `1px solid ${t.indigo[800]}`,
        color: t.indigo[800],
      },
    },
  },

  link: {
    ...buttonDefault,
    backgroundColor: 'transparent',
    color: t.indigo[600],
    border: 'none',
    hover: {
      backgroundColor: 'transparent',
      color: t.indigo[800],
      borderColor: t.indigo[800],
      border: 'none',
    },
    active: {
      backgroundColor: 'transparent',
      color: t.indigo[800],
      border: 'none',
    },
    indigo: {
      backgroundColor: 'transparent',
      color: t.indigo[600],
      border: 'none',
      hover: {
        backgroundColor: 'transparent',
        color: t.indigo[800],
        borderColor: t.indigo[800],
        border: 'none',
      },
      active: {
        backgroundColor: 'transparent',
        color: t.indigo[800],
        border: 'none',
      },
    },
    teal: {
      backgroundColor: 'transparent',
      color: t.teal[600],
      border: 'none',
      hover: {
        backgroundColor: 'transparent',
        color: t.teal[800],
        borderColor: t.teal[800],
        border: 'none',
      },
      active: {
        backgroundColor: 'transparent',
        color: t.teal[800],
        border: 'none',
      },
    },
    white: {
      backgroundColor: 'transparent',
      border: 'none',
      color: t.indigo[600],
      hover: {
        backgroundColor: 'transparent',
        color: t.indigo[800],
        border: 'none',
      },
      active: {
        backgroundColor: 'transparent',
        color: t.indigo[800],
        border: 'none',
      },
    },
  },
}
