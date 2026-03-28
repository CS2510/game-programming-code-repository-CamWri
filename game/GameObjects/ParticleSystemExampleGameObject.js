class ParticleSystemExampleGameObject extends GameObject{
    constructor(){
        super()

        this.addComponent(new ParticleSystem(), {
            startParticles: new UniformDistribution(1, 2),
            particleVelocity: new UniformDistribution(1, 5),
            particleLifetime: new UniformDistribution(0.25, 2),
            particleSize: new UniformDistribution(2, 5),
            particleColor: new UniformColorDistribution(0, 0, 0, 255, 255, 255),
            particleDirection: new UniformDistribution(Math.PI, Math.PI * 2),
            particleGravity: new ConstantDistribution(0.1),
            maintainParticleCount: true,
            continousParticleSpawning: true,
            continousSpawnInterval: new UniformDistribution(0.5, 2),
            continousSpawnParticleCount: new ConstantDistribution(100),
        })
    }
}