import { makeStyles } from "@material-ui/styles";

export const imageDropZoneStyles = () => makeStyles((theme) => ({
  dropMsg: {
    position: 'relative',
    '&:before': {
      content: '""',
      boxSizing: 'border-box',
      textAlign: 'center',
      position: 'absolute',
      left: '-16px',
      right: '0',
      top: '-100px',
      zIndex: '9999',
      fontWeight: '500',
      padding: '42px',
      height: '99px',
      transition: 'all 0.15s ease-in-out',
      borderRadius: '6px',
      textShadow: theme.dark() ? '0 -1px 0 rgba(0,0,0,0.2)' : '0 -1px 0 rgba(255,255,255,1)',
      color: theme.palette.text.selected,
    },
    '&.accepted': {
      '&:before': {
        content: '"↓ Drop your image(s) in place below"',
        backgroundColor: theme.dark() ? theme.palette.icon.secondaryHoverBg : theme.palette.gradient.stop01,
        top: '0',
        marginTop: '16px',
      },
    },
    '&.error, &.rejected, &.rejectedTooMany': {
      '&:before': {
        backgroundColor: theme.palette.events.warn,
        color: '#fff',
        textShadow: '0 -1px 0 rgba(0,0,0,0.1)',
        top: '0',
        marginTop: '16px',
      },
    },
    '&.error': {
      '&:before': {
        content: '"There was a problem with your upload. Please try again."',
      },
    },
    '&.rejected': {
      '&:before': {
        content: '"⚠ Dropdeck accepts JPG, PNG, GIF of up to 8 MB."',
      },
    },
    '&.rejectedTooMany': {
      '&:before': {
        content: '"⚠ Dropdeck accepts up to 12 files at a time."',
      },
    },
    // Progress
    '& .progressWrap': {
      display: 'none',
    },
    '&.active': {
      '&:before': {
        content: '""',
        backgroundColor: theme.dark() ? theme.palette.icon.secondaryHoverBg : theme.palette.gradient.stop01,
        top: '0',
        marginTop: '16px',
      },
      '& .progressWrap': {
        display: 'block',
        position: 'absolute',
        left: 'calc(42% - 16px)',
        right: '42%',
        top: '2.65rem',
        zIndex: '9999',
        textAlign: 'center',
        '& .progressIcon': {
          fontSize: '1.75rem',
          marginBottom: '0.5rem',
        },
        '& .progressBar': {
          borderRadius: '50px',
          overflow: 'hidden',
          backgroundColor: theme.dark() ? theme.palette.button.disabled : theme.palette.background.border00,
          '& > div': {
            background: theme.palette.icon.primary,
          },
        },
      },

    },
  },

}));
