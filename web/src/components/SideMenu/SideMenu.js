// Importa o React para permitir a criação de componentes funcionais
import React from 'react';

// Importa os estilos CSS específicos para o componente SideMenu
import './SideMenu.css';

/**
 * Componente SideMenu
 * Representa a barra lateral da interface, que inclui um botão para iniciar um novo chat.
 */
export const SideMenu = () => {
    return (
        <aside className='sidemenu'>
            {/* Botão para iniciar um novo chat */}
            <div className='sidemenu-button'>
                <span>+</span>
                Novo chat
            </div>
        </aside>
    );
};
