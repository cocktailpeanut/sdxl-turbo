import gradio as gr
from diffusers import AutoPipelineForText2Image, AutoPipelineForImage2Image
from diffusers.utils import load_image
import torch

if torch.cuda.is_available():
  device = "cuda"
elif torch.backends.mps.is_available():
  device = "mps"
else:
  device = "cpu"


pipes = {
  "txt2img": AutoPipelineForText2Image.from_pretrained("stabilityai/sdxl-turbo", torch_dtype=torch.float16, variant="fp16").to(device),
  "img2img": AutoPipelineForImage2Image.from_pretrained("stabilityai/sdxl-turbo", torch_dtype=torch.float16, variant="fp16").to(device)
}


def run(prompt, image):
  print(f"prompt={prompt}, image={image}")
  if image is None:
    return pipes["txt2img"](prompt=prompt, num_inference_steps=1, guidance_scale=0.0).images[0]
  else:
    image = image.resize((512,512))
    print(f"img2img image={image}")
    return pipes["img2img"](prompt, image=image, num_inference_steps=2, strength=0.5, guidance_scale=0.0).images[0]

demo = gr.Interface(
    run,
    inputs=[
      gr.Textbox(label="Prompt"),
      gr.Image(type="pil")
    ],
    outputs=gr.Image(width=512,height=512),
    live=True
)
#demo.dependencies[0]["show_progress"] = "minimal"
demo.launch()
