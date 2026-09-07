import React from 'react';
import { motion } from 'framer-motion';

/**
 * SlideIn component for Left-to-Right, Right-to-Left, and Upward scroll entrance animations.
 */
export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.7,
  distance = 50,
  className = '',
  once = true,
  amount = 0.15,
  ...props
}) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y,
        filter: 'blur(4px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.75,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
        y: direction === 'up' ? 30 : 0,
        filter: 'blur(6px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerChildren = 0.12,
  delayChildren = 0,
  className = '',
  once = true,
  ...props
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  direction = 'up',
  distance = 35,
  duration = 0.6,
  className = '',
  ...props
}) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
