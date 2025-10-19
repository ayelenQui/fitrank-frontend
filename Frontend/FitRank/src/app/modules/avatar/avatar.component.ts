import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-avatar-3d',
  template: `<div #canvasContainer class="canvas-container"></div>`,
  styleUrls: ['./avatar.component.css']
})
export class Avatar3DComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private light!: THREE.DirectionalLight;
  private humanMesh!: THREE.Mesh;

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }

  private initScene(): void {
    // Escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);

    // Cámara
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = 400;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Render
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Luz
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(5, 5, 5);
    this.scene.add(this.light);

    // Modelo base (provisorio: figura tipo maniquí)
    const geometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    this.humanMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.humanMesh);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.humanMesh.rotation.y += 0.01; // rotación continua
    this.renderer.render(this.scene, this.camera);
  }

  // Ejemplo para actualizar "medidas" más adelante
  public actualizarMedidas(cintura: number, altura: number): void {
    const scaleX = cintura / 80;  // base 80 cm
    const scaleY = altura / 170;  // base 170 cm
    this.humanMesh.scale.set(scaleX, scaleY, scaleX);
  }
}
