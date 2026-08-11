"use client";

import { EngineTimeline } from "./EngineTimeline";
import { PipelineTimeline } from "./PipelineTimeline";
import { SprintTimeline } from "./SprintTimeline";
import type { TimelineProps } from "./types";

export type {
  EngineStage,
  EngineTimelineProps,
  PipelineTimelineProps,
  SprintStep,
  SprintTimelineProps,
  TimelineOrientation,
  TimelineProps,
  TimelineStage,
} from "./types";

export function Timeline(props: TimelineProps) {
  if (props.variant === "sprint") {
    return (
      <SprintTimeline steps={props.steps} className={props.className} />
    );
  }

  if (props.variant === "engine") {
    return (
      <EngineTimeline stages={props.stages} className={props.className} />
    );
  }

  return (
    <PipelineTimeline
      stages={props.stages}
      activeIndex={props.activeIndex}
      orientation={props.orientation}
      className={props.className}
    />
  );
}
