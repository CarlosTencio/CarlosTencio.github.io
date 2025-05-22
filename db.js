// Initialize Supabase client
const supabaseUrl = 'https://pamcqkwehrpdwobxjywv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWNxa3dlaHJwZHdvYnhqeXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTgxMjYsImV4cCI6MjA2MzI3NDEyNn0.GjTSN9u2U9R2WxHGUjKfYVEnO_qJDg2jKx_t9NhVhLw';

// Create Supabase client
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Handle newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const successMessage = document.getElementById('successMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;

            try {
                console.log('Intentando insertar:', { Nombre: name, Correo: email });
                
                const { data, error } = await supabase
                    .from('NewsLetter')  // Corregido: NewsLetter en lugar de NewsLetters
                    .insert([
                        { Nombre: name, Correo: email }
                    ]);

                if (error) {
                    console.error('Error detallado:', error);
                    throw error;
                }

                console.log('Datos insertados correctamente');

                // Show success message
                newsletterForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                this.reset();
            } catch (error) {
                console.error('Error completo:', error);
                alert(`Error: ${error.message || 'Error desconocido'}`);
            }
        });
    }
});