import { Component, createRef } from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Leaflet, { CircleMarker, Map as LFMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';

interface Props {
  locations: {
    vfn: [number, number][];
    validators: [number, number][];
  };
}

const Container = styled.div(() => ({
  flex: 1,
}));

class Map extends Component<Props> {
  private mapContainer = createRef<HTMLDivElement>();

  private map?: LFMap;

  private markers: CircleMarker[] = [];

  private static VFN_MARKER_OPTIONS = {
    fillColor: '#ff0000',
    fillOpacity: 0.5,
    radius: 4,
    stroke: false,
  };

  private static VALIDATOR_MARKER_OPTIONS = {
    fillColor: '#0000ff',
    fillOpacity: 0.5,
    radius: 4,
    stroke: false,
  };

  public componentDidMount(): void {
    this.map = Leaflet.map(this.mapContainer.current!).setView([0, 0], 2);
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.loadData();
  }

  public componentWillUnmount(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  public render() {
    return (
      <Box p={2} width="100%" height="calc(100vh - 64px)" display="flex" flexDirection="column">
        <Typography variant="h3">Validators</Typography>
        <Paper style={{ overflow: 'hidden', flex: 1, display: 'flex' }}>
          <Container ref={this.mapContainer} />
        </Paper>
      </Box>
    );
  }

  private async loadData() {
    for (const marker of this.markers) {
      marker.remove();
    }

    const newMarkers: CircleMarker[] = [];

    for (const vfn of this.props.locations.vfn) {
      newMarkers.push(new CircleMarker(vfn, Map.VFN_MARKER_OPTIONS).addTo(this.map!));
    }
    for (const validator of this.props.locations.validators) {
      newMarkers.push(new CircleMarker(validator, Map.VALIDATOR_MARKER_OPTIONS).addTo(this.map!));
    }
  }
}

export default Map;
