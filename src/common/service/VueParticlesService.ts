import { CommonService } from "@/common/core/CommonService";
import { Class } from "@/common/pojo/enum/Class";
import "particles.js-strict";
import { ComponentPublicInstance } from "vue";

export class VueParticlesService extends CommonService<VueParticlesService> {

    public constructor(vue: ComponentPublicInstance) {
        super(vue);
    }

    public initData(): void {
        this.vue.$nextTick(() => {
            this.initParticleJS(
                this.getProp("color"),
                this.getProp("particleOpacity"),
                this.getProp("particlesNumber"),
                this.getProp("shapeType"),
                this.getProp("particleSize"),
                this.getProp("linesColor"),
                this.getProp("linesWidth"),
                this.getProp("lineLinked"),
                this.getProp("lineOpacity"),
                this.getProp("linesDistance"),
                this.getProp("moveSpeed"),
                this.getProp("moveDirection"),
                this.getProp("hoverEffect"),
                this.getProp("hoverMode"),
                this.getProp("clickEffect"),
                this.getProp("clickMode")
            );
        })
    }

    private initParticleJS(
        color: string,
        particleOpacity: number,
        particlesNumber: number,
        shapeType: string,
        particleSize: number,
        linesColor: string,
        linesWidth: number,
        lineLinked: boolean,
        lineOpacity: number,
        linesDistance: number,
        moveSpeed: number,
        moveDirection: string,
        hoverEffect: boolean,
        hoverMode: string,
        clickEffect: boolean,
        clickMode: string
    ): void {
        // @ts-ignore
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": particlesNumber,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": color
                },
                "shape": {
                    // circle, edge, triangle, polygon, star, image
                    "type": shapeType,
                    "stroke": {
                        "width": 0,
                        "color": "#192231"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": particleOpacity,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": particleSize,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": lineLinked,
                    "distance": linesDistance,
                    "color": linesColor,
                    "opacity": lineOpacity,
                    "width": linesWidth
                },
                "move": {
                    "enable": true,
                    "speed": moveSpeed,
                    "direction": moveDirection,
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": hoverEffect,
                        "mode": hoverMode
                    },
                    "onclick": {
                        "enable": clickEffect,
                        "mode": clickMode
                    },
                    "onresize": {

                        "enable": true,
                        "density_auto": true,
                        "density_area": 400

                    }
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    protected getClassName(): string {
        return Class.VueParticlesService;
    }

    static get class(): string {
        return Class.VueParticlesService;
    }

}