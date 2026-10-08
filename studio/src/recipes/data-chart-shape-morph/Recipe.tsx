import React from 'react';
import {AbsoluteFill, type CalculateMetadataFunction} from 'remotion';
import {BrandProvider} from '../../brand/BrandProvider';
import type {Brand} from '../../brand/types';
import {DEMO_BRANDS} from '../../brand/demo';
import {RadarChartMorph, type ChartPalette} from './RadarChartMorph';

export type DataChartContent = {
  title: string;
  labels: string[];
  datasets: number[][];
};

export type DataChartShapeMorphProps = {
  brand: Brand;
  content: DataChartContent;
  morphAt?: number;
  updateFrames?: number;
  palette?: Partial<ChartPalette>;
};

export const DataChartShapeMorph: React.FC<DataChartShapeMorphProps> = ({brand, content, morphAt = 180, updateFrames = 45, palette}) => (
  <BrandProvider brand={brand}>
    <AbsoluteFill>
      <RadarChartMorph title={content.title} labels={content.labels} datasets={content.datasets} morphAt={morphAt} updateFrames={updateFrames} palette={palette} />
    </AbsoluteFill>
  </BrandProvider>
);

export const calculateDataChartShapeMorphMetadata: CalculateMetadataFunction<DataChartShapeMorphProps> = () => ({
  width: 1280,
  height: 800,
  fps: 30,
  durationInFrames: 308,
});

export const dataChartShapeMorphDefaults: DataChartShapeMorphProps = {
  brand: DEMO_BRANDS.shellpine,
  content: {
    title: 'Deploy history',
    labels: ['main', 'api', 'docs', 'auth', 'edge', 'jobs'],
    datasets: [
      [0.44, 0.28, 0.72, 0.42, 0.3, 0.55],
      [0.3, 0.62, 0.48, 0.7, 0.38, 0.82],
      [0.72, 0.34, 0.58, 0.46, 0.76, 0.5],
      [0.4, 0.76, 0.62, 0.32, 0.54, 0.7],
    ],
  },
  morphAt: 180,
  updateFrames: 45,
};
