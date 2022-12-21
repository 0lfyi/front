import { Component, createRef } from 'react';
import { gql } from '@apollo/client';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Leaflet, { CircleMarker, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';
import apolloClient from '../../../apollo';

const Container = styled.div(() => ({
  width: 800,
  height: 600,
}));

class ValidatorsMap extends Component {
  private mapContainer = createRef<HTMLDivElement>();

  private map?: Map;

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
      <Box p={2}>
        <Paper style={{ overflow: 'hidden' }}>
          <Container ref={this.mapContainer} />
        </Paper>
      </Box>
    );
  }

  private async loadData() {
    const res = await apolloClient.query({
      query:  gql`
        query ValidatorPresences {
          validatorPresences {
            vfn
            validator
          }
        }
      `
    });

    for (const marker of this.markers) {
      marker.remove();
    }

    const newMarkers: CircleMarker[] = [];

    for (const it of res.data.validatorPresences) {
      if (it.vfn) {
        newMarkers.push(new CircleMarker(it.vfn, ValidatorsMap.VFN_MARKER_OPTIONS).addTo(this.map!));
      }
      if (it.validator) {
        newMarkers.push(new CircleMarker(it.validator, ValidatorsMap.VALIDATOR_MARKER_OPTIONS).addTo(this.map!));
      }
    }
  }
}

export default ValidatorsMap;
