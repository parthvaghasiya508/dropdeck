import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import MediaCard from "./components/MediaCard";
import LoadingStatusIndicator from "../../common/components/ApplicationBar/components/LoadingStatusIndicator";
import ApplicationBar from "../../common/components/ApplicationBar";
import AppNavigation from "../../common/components/ApplicationBar/components/AppNavigation/AppNavigation";
import DirectoryViewStyling from "../../common/components/DirectoryViewStyling";
import { useFiles } from "../../common/api/sdk/hooks/FileHooks";

const styles = DirectoryViewStyling();

/**
 * Directory of all media for an organisation.
 *
 * @param props
 * @returns {boolean}
 * @constructor
 */
const Media = ({ user }) => {

  const [files, refetch] = useFiles();

  useEffect(() => {
    if (user) {
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const classes = styles();

  const fileList = () => files.map((file) => (
    <MediaCard key={`media-file-${file._id}`} file={file} />
  ));

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ApplicationBar>
          <AppNavigation/>
          <div className={classes.toolbarMenu}>

            {/* Loading Status Indicator */}
            <div className={classes.loadstatus}>
              <LoadingStatusIndicator/>
            </div>

          </div>

        </ApplicationBar>

        <div className={classes.line}> </div>
        <div className={classes.subnav}>
          <div className={classes.subnavInner}>
            <ul>
              <li><div className="active">Images</div></li>
            </ul>
          </div>
        </div>

        <div className={classes.wrapInner} style={{ paddingTop: 104 }}>
          <Grid container spacing={6}>
            {files ? fileList() : null}
          </Grid>
        </div>

      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Media);
