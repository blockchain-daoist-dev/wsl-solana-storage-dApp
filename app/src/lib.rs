use anchor_lang::prelude::*;

declare_id!("B1oXQn9bM35wGjMd7tcvmafhy7DHkfNUtcKZ6U9p4giL");

#[program]
pub mod myproject {
    use super::*;

    pub fn initialize(ctx: Context<Initialize> ) -> Result<()> {
        let initial_account = &mut ctx.accounts.initial_account;
        initial_account.value = String::from("Write your first message!");
        Ok(())
    }

    pub fn update_value(ctx: Context<UpdateValue>, new_value: String) -> Result<()> {
        let storage_account = &mut ctx.accounts.storage_account;
        storage_account.value = new_value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub initial_account: Account<'info, Init>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateValue<'info> {
    #[account(mut)]
    pub storage_account: Account<'info, Init>,
}

#[account]
pub struct Init {
    pub value: String,
}