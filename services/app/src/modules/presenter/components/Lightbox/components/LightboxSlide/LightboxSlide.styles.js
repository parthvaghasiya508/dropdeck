import { makeStyles } from "@material-ui/styles";

export const lightboxSlideStyles = () => makeStyles(() => ({
  overlay: {
    opacity: 1,
    zIndex: 99,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: '#84ffa327',
      border: '2px dashed #09cc39',
      borderRadius: '6px',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'calc(100% - 7px)',
      backgroundPositionY: 'calc(0% + 7px)',
      backgroundImage: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='113px' height='24px' viewBox='0 0 113 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cg id='Icon-and-Text'%3E%3Cpath id='Rounded-Rectangle-copy' d='M5 0 C2.239 0 0 2.239 0 5 L0 19 C0 21.761 2.239 24 5 24 L108 24 C110.761 24 113 21.761 113 19 L113 5 C113 2.239 110.761 0 108 0 Z' fill='%2309cc39' fill-opacity='1' stroke='none'/%3E%3Cdefs%3E%3Ctext id='string' transform='matrix(1.0 0.0 0.0 1.0 25.0 3.5)' x='1.0' font-size='13.968' text-decoration='none' font-family='Inter, Helvetica Neue, Helvetica, Arial' y='14.0' fill='%23ffffff'%3EADD IMAGE%3C/text%3E%3C/defs%3E%3Cuse id='ADD-IMAGE' xlink:href='%23string'/%3E%3Cg id='New-Group-copy'%3E%3Cpath id='Triangle' d='M15.074 12.368 L12.158 16.053 17.99 16.053 Z' fill='%23ffffff' fill-opacity='1' stroke='none'/%3E%3Cpath id='Triangle-copy' d='M11.39 13.105 L9.057 16.053 13.722 16.053 Z' fill='%23ffffff' fill-opacity='1' stroke='none'/%3E%3Cpath id='Path' d='M21 7.211 L21 8.684 18.789 8.684 18.789 10.895 17.316 10.895 17.316 8.684 15.105 8.684 15.105 7.211 17.316 7.211 17.316 5 18.789 5 18.789 7.211 Z M18.789 17.526 L8.474 17.526 8.474 7.211 12.895 7.211 12.895 5.737 8.474 5.737 C7.663 5.737 7 6.4 7 7.211 L7 17.526 C7 18.337 7.663 19 8.474 19 L18.789 19 C19.6 19 20.263 18.337 20.263 17.526 L20.263 13.105 18.789 13.105 Z M15.842 16.053' fill='%23ffffff' fill-opacity='1' stroke='none'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A")`,
      backgroundSize: '95px',
      pointerEvents: 'none',
    },
  }
}));
