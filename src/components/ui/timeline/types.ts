export type TimelineStage = {
  id: string;
  label: string;
};

export type SprintStep = {
  id: string;
  day: string;
  range: string;
  title: string;
  bullets: readonly string[];
};

export type EngineStage = {
  id: string;
  label: string;
};

export type TimelineOrientation = "horizontal" | "vertical" | "responsive";

export type PipelineTimelineProps = {
  variant?: "pipeline";
  stages: TimelineStage[];
  activeIndex: number;
  orientation?: TimelineOrientation;
  steps?: undefined;
  className?: string;
};

export type SprintTimelineProps = {
  variant: "sprint";
  steps: readonly SprintStep[];
  stages?: undefined;
  activeIndex?: undefined;
  orientation?: undefined;
  className?: string;
};

export type EngineTimelineProps = {
  variant: "engine";
  stages: readonly EngineStage[];
  activeIndex?: undefined;
  orientation?: undefined;
  steps?: undefined;
  className?: string;
};

export type TimelineProps =
  | PipelineTimelineProps
  | SprintTimelineProps
  | EngineTimelineProps;
