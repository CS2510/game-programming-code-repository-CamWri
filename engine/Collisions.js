class Collisions {
    static isOverlapPointVertices(point, vertices) {
        return point >= Math.min(...vertices) && point <= Math.max(...vertices)
    }

    static isOverlapPointVerticesDirection(point, vertices, direction) {
        const pointProjection = point.dot(direction)
        const vertexProjections = []
        for (const vertex of vertices) {
            vertexProjections.push(vertex.dot(direction))
        }
        return Collisions.isOverlapPointVertices(pointProjection, vertexProjections)
    }

    static isOverlap(point, vertices) {
        for (let i = 0; i < vertices.length; i++) {
            const one = vertices[i]
            const two = vertices[(i + 1) % vertices.length]
            const edge = one.minus(two)
            const edgeNormalized = edge.normalized()
            const direction = edgeNormalized.orthogonal()

            const result = Collisions.isOverlapPointVerticesDirection(point, vertices, direction)
            if (!result) return false
        }
        return true
    }

    static isCollision(point, gameObject) {
        const polygon = gameObject.getComponent(Polygon)
        const transformedPoints = []
        const position = gameObject.transform.position
        const scale = gameObject.transform.scale

        for (const localPoint of polygon.points) {
            const scaledPoint = localPoint.elementWiseMultiplication(scale)
            const worldPoint = scaledPoint.add(position)
            transformedPoints.push(worldPoint)
        }

        return Collisions.isOverlap(point, transformedPoints)
    }
}