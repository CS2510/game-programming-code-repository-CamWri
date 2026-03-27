class ParticleSystemExampleGameObject extends GameObject{
    constructor(){
        super()

        this.addComponent(new ParticleSystem(), {
            startParticles: new UniformDistribution(10, 20),
            particleVelocity: new UniformDistribution(5, 10),
            particleLifetime: new UniformDistribution(0.25, 1),
            particleSize: new UniformDistribution(1, 2.5),
            particleColor: new ConstantColorDistribution(0, 0, 0),
            particleDirection: new UniformDistribution(Math.PI, Math.PI * 2),
            particleGravity: new ConstantDistribution(0),
            maintainParticleCount: true,
            continousParticleSpawning: true,
            continousSpawnInterval: new UniformDistribution(0.1, 0.5),
            continousSpawnParticleCount: new ConstantDistribution(5),
        })
    }
}