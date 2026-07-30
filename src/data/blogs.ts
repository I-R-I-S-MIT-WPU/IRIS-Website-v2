export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tag: string;
  image: string;
  date: string;
  readTime: string;
}

export const BLOGS: BlogPost[] = [
  {
    id: 'autonomous-nav',
    title: 'Autonomous Navigation in Dense Urban Environments',
    excerpt: 'Exploring how SLAM-based systems handle real-time obstacle detection and path planning in crowded spaces using optical flow and LiDAR fusion.',
    content: `This paper explores the intricate mechanisms of autonomous navigation using simultaneous localization and mapping (SLAM). In rapidly evolving urban environments, our drones must handle dynamic obstacles, GPS-denied zones, and real-time replanning.

We detail our approach using optical flow sensors paired with LiDAR point clouds to achieve centimeter-level accuracy in positioning. The system fuses data from multiple sensors — IMU, barometer, and stereo cameras — to create a robust state estimation pipeline.

Our experiments in the MIT-WPU campus demonstrated successful navigation through narrow corridors, dynamic obstacle avoidance with pedestrians, and autonomous return-to-home functionality even when GPS signal was deliberately jammed.

The key innovation lies in our adaptive path planner that switches between aggressive and conservative flight profiles based on environmental density estimation. In open spaces, the drone maximizes speed. In cluttered environments, it prioritizes safety margins.

Future work includes extending the system to multi-drone formations where each agent shares its local map to build a collaborative global understanding of the environment.`,
    author: 'Siddharth Roy',
    tag: 'Avionics',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
    date: 'Mar 15, 2026',
    readTime: '6 min read',
  },
  {
    id: 'edge-ai',
    title: 'Edge AI: Running Inference on Microcontrollers',
    excerpt: 'How we deploy quantized neural networks on resource-constrained hardware for real-time decision making on STM32 and ESP32.',
    content: `Deploying AI models at the edge presents unique challenges — limited memory, power constraints, and the need for real-time inference. This article covers our pipeline for quantizing PyTorch models to INT8, optimizing them with TensorFlow Lite Micro, and deploying on STM32 and ESP32 platforms.

The traditional approach of cloud inference introduces latency that's unacceptable for our robotics applications. A round-trip to a cloud server takes 100-300ms — an eternity when your robot needs to react to obstacles in real-time.

Our quantization pipeline reduces model size by 4x while maintaining 95%+ accuracy on our benchmark tasks. We use post-training quantization for simple models and quantization-aware training for more complex architectures.

On the STM32H7 running at 480MHz, we achieve 30fps inference for our object detection model — fast enough for real-time obstacle classification. The ESP32-S3 handles simpler tasks like gesture recognition and voice keyword detection.

The biggest challenge was memory management. With only 512KB of RAM available on some targets, we had to carefully optimize tensor arena allocation and implement a custom memory pool that reuses buffers between layers.

We've open-sourced our deployment toolkit on the IRIS GitHub, making it easy for other teams to go from a trained PyTorch model to a running MCU binary in under 10 minutes.`,
    author: 'Vikram Mehta',
    tag: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
    date: 'Feb 28, 2026',
    readTime: '8 min read',
  },
  {
    id: 'swarm-comms',
    title: 'Decentralized Swarm Communication Protocols',
    excerpt: 'Building RF-consensus frameworks that allow drone swarms to coordinate without a central controller through emergent behavior.',
    content: `Traditional multi-agent systems rely on a central coordinator — a single point of failure. Our Tarzan project implements a fully decentralized consensus protocol using low-power RF mesh networks.

Each agent broadcasts its state vector and receives neighbor states, achieving emergent coordination through simple local rules that produce complex global behavior. The protocol is inspired by biological swarms — birds flocking, fish schooling — where no single entity has a global view.

We use LoRa-based radios operating at 868MHz for long-range communication (up to 2km line-of-sight) and ESP-NOW for short-range, low-latency neighbor discovery within 100m. Each drone maintains a local neighbor table that's updated every 50ms.

The consensus algorithm handles three core tasks: formation maintenance, task allocation, and collision avoidance. Formation is maintained through virtual spring-damper connections between neighbors. Task allocation uses a distributed auction protocol. Collision avoidance is reactive and purely local.

Our field tests with 5 drones showed stable formations even when one drone was deliberately disabled — the swarm reorganized within 2 seconds. We're currently scaling to 12 drones and working on heterogeneous swarms mixing fixed-wing and quadrotor platforms.`,
    author: 'Alex Rivera',
    tag: 'Robotics',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    date: 'Jan 10, 2026',
    readTime: '7 min read',
  },
  {
    id: 'soteria-security',
    title: 'Building Soteria: A Campus-Scale Security Mesh',
    excerpt: 'How we designed and deployed a distributed security monitoring system using edge computing and computer vision.',
    content: `Soteria started as a simple idea: what if campus security could be augmented with AI-powered monitoring that respects privacy while improving response times?

Our system uses a mesh of Raspberry Pi 4 nodes with attached cameras, each running lightweight person detection models locally. No video ever leaves the device — only metadata (person count, direction of movement, anomaly flags) is transmitted to the central dashboard.

The architecture uses MQTT for real-time event streaming and a time-series database for historical analysis. Each node processes 15fps locally and can trigger alerts within 200ms of detecting an anomaly.

Privacy was our primary design constraint. We implemented differential privacy for all aggregated statistics, and individual tracking is impossible by design — nodes only report anonymous counts and general movement patterns.

The system has been running in pilot mode covering 3 campus buildings for 4 months. Response times to reported incidents improved by 40%, and the security team reports significantly better situational awareness during peak hours.`,
    author: 'Priya Sharma',
    tag: 'Security',
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=800&auto=format&fit=crop',
    date: 'Dec 5, 2025',
    readTime: '5 min read',
  },
  {
    id: 'rust-embedded',
    title: 'Why We Switched Our Flight Controller to Rust',
    excerpt: 'The journey of migrating our custom flight controller firmware from C to Rust — the wins, the pain, and the lessons.',
    content: `After three memory-related crashes during test flights (one of which destroyed a prototype), we made the controversial decision to rewrite our flight controller firmware in Rust.

The C codebase was 12,000 lines, battle-tested but full of subtle pointer arithmetic and manual memory management that made debugging nearly impossible. Race conditions between the IMU interrupt handler and the main control loop caused intermittent failures that no amount of testing could reliably reproduce.

Rust's ownership model eliminated entire categories of bugs. The borrow checker caught two data races during compilation that had existed undetected in our C code for months. The type system forced us to handle every error case explicitly.

The migration took 3 months — longer than expected because the embedded Rust ecosystem, while maturing, still has gaps. We had to write our own HAL drivers for the BMI088 IMU and the DPS310 barometer.

Performance is on par with C — within 2% on our benchmark loops. Binary size increased by about 15% due to Rust's more aggressive error handling, but we had ample flash space.

The real win: zero memory-related crashes in 6 months of testing. The firmware has been rock-solid, and new team members can contribute without fear of introducing undefined behavior.`,
    author: 'Karthik Nair',
    tag: 'Systems',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
    date: 'Nov 20, 2025',
    readTime: '9 min read',
  },
];
