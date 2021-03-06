import { withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";

const styles = () => ({
  root: {
    height: 12,
    border: "1px dashed #e5e5e5",
    margin: "5px 0"
  },
  hovering: {
    background: "#039be5"
  },
  canDrop: {
    background: "#7ec0e4"
  }
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;

  canDrop: (item: any) => boolean;
  onDrop: (item: any) => void;
}

const InsertTarget: React.SFC<Props> = props => {
  const { classes, canDrop, onDrop, ...other } = props;

  const [{ isHovering, isCanDrop, item }, drop] = useDrop({
    accept: ["component", "component-node"],
    canDrop,
    collect: monitor => ({
      isHovering: monitor.isOver({ shallow: true }),
      item: monitor.getItem(),
      isCanDrop: monitor.canDrop()
    }),
    drop: (dropResult, monitor) => {
      const data = monitor.getItem();
      const didDrop = monitor.didDrop();
      const isHoveringState = monitor.isOver({ shallow: true });

      if (!isHoveringState) {
        return undefined;
      }

      if (didDrop) {
        return;
      }

      onDrop(dropResult);
    }
  });

  return (
    <div
      className={clsx(classes.root, {
        [classes.hovering]: isHovering && isCanDrop,
        [classes.canDrop]: !isHovering && isCanDrop
      })}
      ref={drop}
    />
  );
};

export default withStyles(styles)(InsertTarget);
